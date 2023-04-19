package com.ecs.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ecs.api.dto.req.AwsS3;
import com.ecs.api.dto.req.DrawPostReq;
import com.ecs.api.entity.Draw;
import com.ecs.api.entity.Subjects;
import com.ecs.api.entity.Users;
import com.ecs.api.repository.DrawRepository;
import com.ecs.api.repository.SubjectRepository;
import com.ecs.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    UserRepository userRepository;
    @Autowired
    private DrawRepository drawReopsitory;
    @Autowired
    private SubjectRepository subjectRepository;

    @Override
    public AwsS3 upload(DrawPostReq drawPostReq,MultipartFile multipartFile, String dirName) throws IOException {

        File file = convertMultipartFileToFile(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File convert fail"));
        return upload(drawPostReq,file,dirName);
    }
    private AwsS3 upload(DrawPostReq drawPostReq,File file, String dirName) {
        String key = randomFileName(file, dirName);
        String path = putS3(file, key);
        removeFile(file);

        Draw draw = new Draw();
        Users user = userRepository.findByUsersNo(drawPostReq.getUsersNo());
        Subjects subjects = subjectRepository.findBySubjectsNM(drawPostReq.getSubjectNM());
        draw.setDrawPostTF(drawPostReq.isDrawPostTF());
        draw.setUsersNo(user);
        draw.setCategoryNo(subjects.getCategoryNo());
        draw.setDrawDrawing(path);
        drawReopsitory.save(draw);
        return AwsS3
                .builder()
                .key(key)
                .path(path)
                .build();
    }
    private String randomFileName(File file, String dirName) {
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
    public void remove(AwsS3 awsS3) {
        if (!amazonS3.doesObjectExist(bucket, awsS3.getKey())) {
            throw new AmazonS3Exception("Object " +awsS3.getKey()+ " does not exist!");
        }
        amazonS3.deleteObject(bucket, awsS3.getKey());
    }

}
