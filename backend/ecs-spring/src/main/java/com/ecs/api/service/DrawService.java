package com.ecs.api.service;

import com.ecs.api.dto.req.AwsS3ReqDto;
import com.ecs.api.dto.req.DrawReqDto;
import com.ecs.api.entity.Category;
import com.ecs.api.entity.Subjects;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DrawService {
    AwsS3ReqDto upload(DrawReqDto drawReqDto, MultipartFile multipartFile) throws IOException;

    void remove(AwsS3ReqDto awsS3ReqDto);

    List<Category> getAllCategory();

    List<Subjects> getSubjects(int categoryNo);

    AwsS3ReqDto update(int drawNo,DrawReqDto drawReqDto, MultipartFile multipartFile) throws IOException;
}
