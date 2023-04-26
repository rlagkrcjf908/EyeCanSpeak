package com.ecs.api.service;

import com.ecs.api.dto.req.WriteReqDto;

public interface WriteService {
    void setWrite(int userNo, WriteReqDto writeReqDto);
}
