package com.ecs.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.ecs.api.dto.res.UserDrawGetResDto;
import com.ecs.api.dto.res.UserDrawResDto;
import com.ecs.api.entity.Draw;
import com.ecs.api.entity.Users;
import com.ecs.api.repository.DrawRepository;
import com.ecs.api.repository.LikesRepository;
import com.ecs.api.repository.UserRepositorySupport;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepositorySupport userRepositorySupport;
    private final DrawRepository drawRepository;
    private final LikesRepository likesRepository;
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    public List<UserDrawResDto> findUserDrawList(Users users, int num, boolean like, boolean date) {
        List<UserDrawResDto> userDrawList=userRepositorySupport.findUserDrawList(users, num, like, date);

        for (UserDrawResDto userDrawResDto : userDrawList) {
            userDrawResDto.setDrawDrawing(getS3(bucket, userDrawResDto.getDrawDrawing()));
            if (likesRepository.existsByUsersNoAndDrawNo(users, Draw.builder().drawNo(userDrawResDto.getDrawNo()).build())) {
                userDrawResDto.setLike(true);
            } else {
                userDrawResDto.setLike(false);
            }
        }
        return userDrawList;
    }

    @Override
    public UserDrawGetResDto findUserDraw(int drawNo) {
        Draw draw=drawRepository.findDrawsByDrawNo(drawNo).orElseThrow(()->new IllegalArgumentException("그림 없음"));
        UserDrawGetResDto getDraw=new UserDrawGetResDto(draw);
        getDraw.setDrawDrawing(getS3(bucket, draw.getDrawDrawing()));
        return getDraw;
    }

    private String getS3(String bucket, String fileName) {
        return amazonS3.getUrl(bucket, fileName).toString();
    }
}
