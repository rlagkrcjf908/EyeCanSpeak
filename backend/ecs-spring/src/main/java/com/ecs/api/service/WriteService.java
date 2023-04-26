package com.ecs.api.service;

import com.ecs.api.dto.req.WriteReqDto;
import com.ecs.api.dto.res.WriteResDto;

import java.util.List;

public interface WriteService {
    void setWrite(int userNo, WriteReqDto writeReqDto);

    WriteResDto getWriteHistory(int userNo, WriteReqDto writeReqDto);
}
