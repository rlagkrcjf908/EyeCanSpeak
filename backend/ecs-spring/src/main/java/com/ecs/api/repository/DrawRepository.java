package com.ecs.api.repository;

import com.ecs.api.entity.Category;
import com.ecs.api.entity.Draw;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DrawRepository extends JpaRepository<Draw,Integer> {

    Optional<List<Draw>> findDrawsByCategoryNo(Category category);

}
