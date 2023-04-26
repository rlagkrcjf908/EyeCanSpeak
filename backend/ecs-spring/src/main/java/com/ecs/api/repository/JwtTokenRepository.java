package com.ecs.api.repository;

import com.ecs.api.entity.JwtToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JwtTokenRepository extends JpaRepository<JwtToken, Integer> {
    Optional<JwtToken> findByUsersNo(int usersNo);
    boolean existsByUsersNo(int userNo);
}
