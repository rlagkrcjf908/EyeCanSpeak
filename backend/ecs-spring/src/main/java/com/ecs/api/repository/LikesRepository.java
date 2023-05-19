package com.ecs.api.repository;

import com.ecs.api.entity.Draw;
import com.ecs.api.entity.Likes;
import com.ecs.api.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikesRepository extends JpaRepository<Likes, Integer> {

    Optional<Likes> findByUsersNoAndDrawNo(Users users, Draw draw);
    boolean existsByUsersNoAndDrawNo(Users users, Draw draw);
}