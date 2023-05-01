package com.ecs.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.ecs.api.dto.res.UserDrawResDto;
import com.ecs.api.entity.Draw;
import com.ecs.api.entity.Users;
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
    private final LikesRepository likesRepository;
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    public List<UserDrawResDto> findUserDrawList(Users users, int num, boolean like, boolean date) {
        List<UserDrawResDto> userDrawList=userRepositorySupport.findUserDrawList(users, num, like, date);

        for (UserDrawResDto userDrawResDto : userDrawList) {
            userDrawResDto.setDraw_drawing(getS3(bucket, userDrawResDto.getDraw_drawing()));
            if (likesRepository.existsByUsersNoAndDrawNo(users, Draw.builder().drawNo(userDrawResDto.getDraw_no()).build())) {
                userDrawResDto.setLike(true);
            } else {
                userDrawResDto.setLike(false);
            }
        }
        return userDrawList;
    }

    private String getS3(String bucket, String fileName) {
        return amazonS3.getUrl(bucket, fileName).toString();
    }
}
