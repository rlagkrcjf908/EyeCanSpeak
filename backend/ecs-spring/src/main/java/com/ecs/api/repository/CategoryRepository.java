package com.ecs.api.repository;

import com.ecs.api.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category,Integer> {

    Optional<Category> findByCategoryNo(int categoryNo);
}
