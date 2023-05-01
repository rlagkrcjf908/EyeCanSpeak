package com.ecs.api.repository;

import com.ecs.api.dto.res.UserDrawResDto;
import com.ecs.api.entity.Users;

import java.util.List;

public interface UserCustomRepository {
    List<UserDrawResDto> findUserDrawList(Users users, int num, boolean like, boolean date);
}
