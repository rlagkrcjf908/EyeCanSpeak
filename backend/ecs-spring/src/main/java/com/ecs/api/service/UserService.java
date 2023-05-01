package com.ecs.api.service;

import com.ecs.api.dto.res.UserDrawResDto;
import com.ecs.api.entity.Users;

import java.util.List;

public interface UserService {
    List<UserDrawResDto> findUserDrawList(Users users, int num, boolean like, boolean date);
}
