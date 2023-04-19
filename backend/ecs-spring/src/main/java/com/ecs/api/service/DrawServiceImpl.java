package com.ecs.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ecs.api.dto.req.AwsS3ReqDto;
import com.ecs.api.dto.req.DrawReqDto;
import com.ecs.api.entity.Draw;
import com.ecs.api.entity.Subjects;
import com.ecs.api.entity.Users;
import com.ecs.api.repository.DrawRepository;
import com.ecs.api.repository.SubjectRepository;
import com.ecs.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
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
        Optional<Users> user = Optional.of(userRepository.findByUsersNo(drawReqDto.getUsersNo()));
        Optional<Subjects> subjects = Optional.ofNullable(subjectRepository.findBySubjectsNM(drawReqDto.getSubjectNM()));
        draw.setDrawPostTF(drawReqDto.isDrawPostTF());
        if(user.isPresent())draw.setUsersNo(user.get());
        draw.setCategoryNo(subjects.get().getCategoryNo());
        draw.setDrawDrawing(path);
        drawReopsitory.save(draw);
        return AwsS3ReqDto
                .builder()
                .key(key)
                .path(path)
                .build();
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
    @Override
    public void remove(AwsS3ReqDto awsS3ReqDto) {
        if (!amazonS3.doesObjectExist(bucket, awsS3ReqDto.getKey())) {
            throw new AmazonS3Exception("Object " + awsS3ReqDto.getKey()+ " does not exist!");
        }
        amazonS3.deleteObject(bucket, awsS3ReqDto.getKey());
    }

}
