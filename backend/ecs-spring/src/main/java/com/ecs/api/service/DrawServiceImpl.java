package com.ecs.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ecs.api.dto.req.AwsS3;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DrawServiceImpl implements DrawService{

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    public AwsS3 upload(MultipartFile multipartFile, String dirName) throws IOException {
        System.out.println("service "+ multipartFile);
        System.out.println("service "+ dirName);
        File file = convertMultipartFileToFile(multipartFile);
        System.out.println("file나온거"+file);
        return upload(file,dirName);
    }
    private AwsS3 upload(File file, String dirName) {
        String key = randomFileName(file, dirName);
        System.out.println("upload "+file);
        System.out.println("random key "+ key);
        String path = putS3(file, key);
        System.out.println(key+" upload "+ path);
        removeFile(file);

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
        System.out.println(bucket);
        System.out.println(uploadFile);
        System.out.println(fileName);
        System.out.println(amazonS3.getRegionName());
        amazonS3.putObject(new PutObjectRequest(bucket, fileName, uploadFile)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        System.out.println("여기는 진행했고?");
        return getS3(bucket, fileName);
    }

    private String getS3(String bucket, String fileName) {
        System.out.println("나 여기 왔니?");
        return amazonS3.getUrl(bucket, fileName).toString();
    }

    private void removeFile(File file) {
        file.delete();
    }

    public File convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
        File file = new File(System.getProperty("user.dir") + "/" + multipartFile.getOriginalFilename());
        System.out.println("convert "+ file);
        System.out.println(file.createNewFile());
        if (file.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(file)){
                fos.write(multipartFile.getBytes());
                System.out.println("fos "+ fos);
            }
            return file;
        }else {
            return file;
        }
    }
    @Override
    public void remove(AwsS3 awsS3) {
        if (!amazonS3.doesObjectExist(bucket, awsS3.getKey())) {
            throw new AmazonS3Exception("Object " +awsS3.getKey()+ " does not exist!");
        }
        amazonS3.deleteObject(bucket, awsS3.getKey());
    }

}
