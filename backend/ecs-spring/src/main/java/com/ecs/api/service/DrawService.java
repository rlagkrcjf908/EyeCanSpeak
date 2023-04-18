package com.ecs.api.service;

import com.ecs.api.dto.req.AwsS3;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface DrawService {
    AwsS3 upload(MultipartFile multipartFile, String upload) throws IOException;

    void remove(AwsS3 awsS3);
}
