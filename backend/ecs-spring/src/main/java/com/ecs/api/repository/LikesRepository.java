package com.ecs.api.repository;

import com.ecs.api.entity.Draw;
import com.ecs.api.entity.Likes;
import com.ecs.api.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes, Integer> {
    Likes findByUsersNoAndDrawNo(Users users, Draw draw);
    boolean existsByUsersNoAndDrawNo(Users users, Draw draw);
}