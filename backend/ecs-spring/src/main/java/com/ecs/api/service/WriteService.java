package com.ecs.api.service;

import com.ecs.api.dto.req.WriteReqDto;
import com.ecs.api.dto.res.WriteResDto;
import com.ecs.api.entity.Users;

import java.util.List;

public interface WriteService {
    void setWrite(Users users, WriteReqDto writeReqDto);

    WriteResDto getWriteHistory(Users users, WriteReqDto writeReqDto);
}
