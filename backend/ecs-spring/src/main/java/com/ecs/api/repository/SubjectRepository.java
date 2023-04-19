package com.ecs.api.repository;

import com.ecs.api.entity.Subjects;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subjects,Integer> {
    Optional<Subjects> findBySubjectsNM(String subjectsNM);
}
