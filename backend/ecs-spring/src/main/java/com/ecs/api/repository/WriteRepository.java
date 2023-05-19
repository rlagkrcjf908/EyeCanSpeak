package com.ecs.api.repository;

import com.ecs.api.entity.Writes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WriteRepository extends JpaRepository<Writes,Integer> {
}
