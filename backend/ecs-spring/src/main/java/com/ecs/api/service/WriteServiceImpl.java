package com.ecs.api.service;

import com.ecs.api.dto.req.WriteReqDto;
import com.ecs.api.dto.res.WriteResDto;
import com.ecs.api.entity.Likes;
import com.ecs.api.entity.Users;
import com.ecs.api.entity.Writes;
import com.ecs.api.repository.LikesRepository;
import com.ecs.api.repository.UserRepository;
import com.ecs.api.repository.WriteRepository;
import com.ecs.api.repository.WriteRepositorySupport;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WriteServiceImpl implements WriteService{
    private final UserRepository userRepository;
    private final WriteRepository writeRepository;
    private final WriteRepositorySupport writeRepositorySupport;

    @Override
    public void setWrite(int userNo, WriteReqDto writeReqDto) {
        Users users = userRepository.findByUsersNo(userNo).orElseThrow(()->new IllegalArgumentException("no such data"));;
        Writes writes = new Writes();
        writes.setWriteContent(writeReqDto.getWriteContent());
        writes.setUsersNo(users);
        writeRepository.save(writes);
    }

    @Override
    public WriteResDto getWriteHistory(int userNo, WriteReqDto writeReqDto) {
        WriteResDto writeResDto = new WriteResDto();
        writeResDto.setWriteContents(writeRepositorySupport.findAll(writeReqDto.getWriteContent(), userNo));
        return  writeResDto;
    }
}
