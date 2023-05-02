package com.ecs.api.repository;

import com.ecs.api.dto.res.DrawGetResDto;
import com.ecs.api.entity.QDraw;
import com.ecs.api.entity.QLikes;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.ecs.api.entity.QDraw.draw;

@Repository
public class DrawRepositorySupport{
    private final JPAQueryFactory jpaQueryFactory;
    QDraw qDraw = QDraw.draw;
    QLikes qLikes = QLikes.likes;


    public DrawRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }


    public List<DrawGetResDto> findAll(boolean like, boolean date,int num)  {

        OrderSpecifier[] orderSpecifiers = createOrderSpecifier(like, date);

        List<DrawGetResDto> drawGetResDtos = jpaQueryFactory.select(Projections.bean(DrawGetResDto.class,qDraw.drawNo,qDraw.drawDrawing,qDraw.drawRecentDate.as("drawRecentDate"),qDraw.count().as("count")))
                .from(qDraw)
                .where(qDraw.drawPostTF.eq(true),eqCategory(num))
                .join(qLikes)
                .on(qDraw.drawNo.eq(qLikes.drawNo.drawNo))
                .groupBy(qDraw.drawNo)
                .orderBy(orderSpecifiers)
                .fetch();
        return drawGetResDtos;

    }
    private BooleanExpression eqCategory(int num){
        if(num != -1){
            return draw.categoryNo.categoryNo.eq(num);
        }
        return null;
    }


    private OrderSpecifier[] createOrderSpecifier(boolean like, boolean date){
        List<OrderSpecifier> orderSpecifiers = new ArrayList<>();
        if(like) {
            orderSpecifiers.add(new OrderSpecifier(Order.DESC, qLikes.count()));
        }else if(date){
            orderSpecifiers.add(new OrderSpecifier(Order.DESC, qDraw.drawRecentDate));
        }
        return orderSpecifiers.toArray(new OrderSpecifier[orderSpecifiers.size()]);
    }


}
