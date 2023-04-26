package com.ecs.api.service;

import com.ecs.api.dto.req.WriteReqDto;
import com.ecs.api.entity.Users;
import com.ecs.api.entity.Writes;
import com.ecs.api.repository.UserRepository;
import com.ecs.api.repository.WriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WriteServiceImpl implements WriteService{
    private final UserRepository userRepository;
    private final WriteRepository writeRepository;

    @Override
    public void setWrite(int userNo, WriteReqDto writeReqDto) {
        Users users = userRepository.findByUsersNo(userNo).orElseThrow(()->new IllegalArgumentException("no such data"));;
        Writes writes = new Writes();
        System.out.println(writeReqDto.getWriteContent());
        writes.setWriteContent(writeReqDto.getWriteContent());
        writes.setUsersNo(users);
        writeRepository.save(writes);
    }
}
