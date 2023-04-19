package com.ecs.api.service;

import com.ecs.api.dto.req.AwsS3ReqDto;
import com.ecs.api.dto.req.DrawReqDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface DrawService {
    AwsS3ReqDto upload(DrawReqDto drawReqDto, MultipartFile multipartFile) throws IOException;

    void remove(AwsS3ReqDto awsS3ReqDto);
}
