package com.ecs.api.repository;

import com.ecs.api.dto.res.WriteResDto;
import com.ecs.api.entity.QWrites;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class WriteRepositorySupport {
    private final JPAQueryFactory jpaQueryFactory;

    QWrites qWrites = QWrites.writes;


    public WriteRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public List<String> findAll(String content, int userNo){
        OrderSpecifier orderSpecifier = new OrderSpecifier(Order.DESC, qWrites.writeDate);
        List<String> writeResDtos =
                jpaQueryFactory.select(qWrites.writeContent)
                .from(qWrites)
                .where(qWrites.usersNo.usersNo.eq(userNo).and(qWrites.writeContent.contains(content)))
                .orderBy(orderSpecifier)
                .offset(0)
                .limit(5)
                .fetch();
        return writeResDtos;
    }
}
