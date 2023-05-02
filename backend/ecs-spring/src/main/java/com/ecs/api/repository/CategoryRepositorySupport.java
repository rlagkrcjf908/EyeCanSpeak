package com.ecs.api.repository;

import com.ecs.api.entity.Category;
import com.ecs.api.entity.QCategory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CategoryRepositorySupport {
    private final JPAQueryFactory jpaQueryFactory;

    QCategory qCategory = QCategory.category;

    public CategoryRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public List<Category> findAll()  {
        List<Category> categories = jpaQueryFactory.select(qCategory)
                                                    .from(qCategory)
                                                    .offset(1)
                                                    .limit(4)
                                                    .fetch();
        return categories;
    }

    }
