package com.ecs.api.repository;

import com.ecs.api.entity.Category;
import com.ecs.api.entity.Subjects;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subjects,Integer> {
    Optional<Subjects> findBySubjectsNM(String subjectsNM);
    Optional<List<Subjects>> findByCategoryNo(Category category);
}
