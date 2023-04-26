package com.ecs.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ecs.api.dto.req.AwsS3ReqDto;
import com.ecs.api.dto.req.DrawReqDto;
import com.ecs.api.dto.res.DrawGetResDto;
import com.ecs.api.dto.res.DrawResDto;
import com.ecs.api.entity.*;
import com.ecs.api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DrawServiceImpl implements DrawService{

    private final AmazonS3 amazonS3;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${cloud.aws.s3.dirName}")
    private String dirName;

    private final UserRepository userRepository;

    private final DrawRepository drawReopsitory;

    private final SubjectRepository subjectRepository;
    private final CategoryRepository categoryRepository;
    private final DrawRepositorySupport drawRepositorySupport;
    private final LikesRepository likesRepository;

    //그림 주제 선택--------------------------------------------------------------------------------------
    @Override
    public List<Category> getAllCategory() {
        List<Category> categories = categoryRepository.findAll();

        return categories;
    }

    @Override
    public List<Subjects> getSubjects(int categoryNo) {
        Category category = categoryRepository.findById(categoryNo).orElseThrow(()->new IllegalArgumentException("no such data"));
        List<Subjects> subjects = subjectRepository.findByCategoryNo(category).orElseThrow(()->new IllegalArgumentException("no such data"));
        return subjects;
    }

    //--------------------------------------------------------------------------------------------------
    @Override
    public AwsS3ReqDto upload(DrawReqDto drawReqDto, MultipartFile multipartFile) throws IOException {

        File file = convertMultipartFileToFile(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File convert fail"));
        return upload(drawReqDto,file);
    }
    private AwsS3ReqDto upload(DrawReqDto drawReqDto, File file) {
        String key = randomFileName(file);
        String path = putS3(file, key);
        removeFile(file);

        Draw draw = new Draw();
        Users user = userRepository.findByUsersNo(drawReqDto.getUsersNo()).orElseThrow(()-> new IllegalArgumentException("no such data"));
        Subjects subjects = subjectRepository.findBySubjectsNM(drawReqDto.getSubjectNM()).orElse(null);
        draw.setDrawPostTF(drawReqDto.isDrawPostTF());
        draw.setUsersNo(user);
        draw.setCategoryNo(subjects.getCategoryNo());


        // key 값으로 삭제인지 path로 삭제인지 다시 확인할 것
        draw.setDrawDrawing(key);
        drawReopsitory.save(draw);

        return AwsS3ReqDto
                .builder()
                .key(key)
                .path(path)
                .build();
    }
    // 그림 수정
    @Override
    public AwsS3ReqDto update(int drawNo,DrawReqDto drawReqDto, MultipartFile multipartFile) throws IOException {

        Draw draw = drawReopsitory.findById(drawNo).orElseThrow(()-> new IllegalArgumentException("no such data"));

        File file = convertMultipartFileToFile(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File convert fail"));

        String path = putS3(file, draw.getDrawDrawing());
        removeFile(file);

        Users user = userRepository.findByUsersNo(drawReqDto.getUsersNo()).orElseThrow(()-> new IllegalArgumentException("no such data"));
        Subjects subjects = subjectRepository.findBySubjectsNM(drawReqDto.getSubjectNM()).orElse(null);
        draw.setDrawPostTF(drawReqDto.isDrawPostTF());
        draw.setUsersNo(user);
        draw.setCategoryNo(subjects.getCategoryNo());

        // key 값으로 삭제인지 path로 삭제인지 다시 확인할 것
        draw.setDrawDrawing(draw.getDrawDrawing());
        drawReopsitory.save(draw);
        return AwsS3ReqDto
                .builder()
                .key(draw.getDrawDrawing())
                .path(path)
                .build();
    }
    // 그림 불러오기
    @Override
    public String getDraw(int drawNo) {
        Draw draw = drawReopsitory.findById(drawNo).orElseThrow(()-> new IllegalArgumentException("no such data"));
        return getS3(bucket,draw.getDrawDrawing());

    }


    private String randomFileName(File file) {
        return dirName + "/" + UUID.randomUUID() + file.getName();
    }

    private String putS3(File uploadFile, String fileName) {

        amazonS3.putObject(new PutObjectRequest(bucket, fileName, uploadFile)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        return getS3(bucket, fileName);
    }

    private String getS3(String bucket, String fileName) {
        return amazonS3.getUrl(bucket, fileName).toString();
    }

    private void removeFile(File file) {
        file.delete();
    }

    public Optional<File> convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
        File file = new File(System.getProperty("user.dir") + "/" + multipartFile.getOriginalFilename());

        if (file.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(file)){
                fos.write(multipartFile.getBytes());
            }
            return Optional.of(file);
        }
        return Optional.empty();
    }
    // 테스트용 S3 파일삭제
    @Override
    public void remove(int drawNo) {
        Draw draw = drawReopsitory.findById(drawNo).orElseThrow(()->new IllegalArgumentException("no such data"));
        if (!amazonS3.doesObjectExist(bucket, draw.getDrawDrawing())) {
            throw new AmazonS3Exception("Object " + draw.getDrawDrawing()+ " does not exist!");
        }
        amazonS3.deleteObject(bucket, draw.getDrawDrawing());
        drawReopsitory.delete(draw);
    }
    // 작품 공유 --------------------------------------------------------------------------------------------------
    @Override
    public List<DrawResDto> getList(int userNo,int categoryNo, boolean like, boolean date) {
        Users user = userRepository.findByUsersNo(userNo).orElseThrow(()->new IllegalArgumentException("no such data"));
        Category category = categoryRepository.findById(categoryNo).orElseThrow(()->new IllegalArgumentException("no such data"));
        List<DrawGetResDto> draws = drawRepositorySupport.findAll(like,date);
        return initDrawList(user,category,draws);
    }

    public List<DrawResDto> initDrawList(Users user,Category category,List<DrawGetResDto> draws) {
        List<DrawResDto> getDraws = new ArrayList<>();
        for (int i = 0; i < draws.size(); i++) {
            DrawGetResDto drawdto = draws.get(i);
            Draw dentity = drawReopsitory.findById(drawdto.getDrawNo()).orElseThrow(()->new IllegalArgumentException("no such data"));
            Likes likes = likesRepository.findByUsersNoAndDrawNo(user, dentity);

            DrawResDto dto = new DrawResDto();
            dto.setDrawDrawing(drawdto.getDrawDrawing());
            dto.setDrawNo(drawdto.getDrawNo());
            dto.setDrawDate(drawdto.getDrawRecentDate());
            dto.setCount(drawdto.getCount());
            if (likes == null) dto.setLike(false);
            dto.setLike(true);

            dto.setUserNM(dentity.getUsersNo().getUsersNickName());
            dto.setCategoryNM(category.getCategoryNM());

            getDraws.add(dto);
        }
        return getDraws;
    }

}
