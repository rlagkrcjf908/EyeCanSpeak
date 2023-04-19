package com.ecs.api.repository;

import com.ecs.api.entity.Subjects;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subjects,Integer> {
    Subjects findBySubjectsNM(String subjectsNM);
}
