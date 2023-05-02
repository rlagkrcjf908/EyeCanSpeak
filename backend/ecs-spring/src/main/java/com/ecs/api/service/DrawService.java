package com.ecs.api.service;

import com.ecs.api.dto.req.AwsS3ReqDto;
import com.ecs.api.dto.req.DrawReqDto;
import com.ecs.api.dto.req.LikeReqDto;
import com.ecs.api.dto.res.DrawResDto;
import com.ecs.api.entity.Category;
import com.ecs.api.entity.Subjects;
import com.ecs.api.entity.Users;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DrawService {
    AwsS3ReqDto upload(Users users, DrawReqDto drawReqDto, MultipartFile multipartFile) throws IOException;

    // 테스트용 S3 파일삭제
    void remove(int drawNo);

    List<Category> getAllCategory();

    List<Subjects> getSubjects(int categoryNo);

    AwsS3ReqDto update(Users users, int drawNo, DrawReqDto drawReqDto, MultipartFile multipartFile) throws IOException;

    String getDraw(int drawNo);

    List<DrawResDto> getList(Users users,int categoryNo, boolean like, boolean date);

    void likes(Users users, LikeReqDto likeReqDto);

    void dellikes(Users users, LikeReqDto likeReqDto);
}
