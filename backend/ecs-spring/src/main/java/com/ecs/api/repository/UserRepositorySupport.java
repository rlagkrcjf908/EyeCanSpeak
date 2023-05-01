package com.ecs.api.repository;

import com.ecs.api.dto.res.UserDrawResDto;
import com.ecs.api.entity.*;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.ecs.api.entity.QDraw.*;
import static com.ecs.api.entity.QLikes.*;

@Repository
public class UserRepositorySupport implements  UserCustomRepository{
    private final JPAQueryFactory queryFactory;

    public UserRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        this.queryFactory = jpaQueryFactory;
    }

    @Override
    public List<UserDrawResDto> findUserDrawList(Users users, int num, boolean like, boolean date) {

        List<UserDrawResDto> userDrawResDtoList= queryFactory
                .select(Projections.constructor(UserDrawResDto.class, draw.drawNo, draw.drawDrawing, draw.drawRecentDate, draw.categoryNo.categoryNM, draw.drawPostTF))
                .from(draw)
                .where(draw.usersNo.usersNo.eq(users.getUsersNo()), eqCategory(num))
                .orderBy(sortByField(like, date).toArray(new OrderSpecifier[0]))
                .fetch();
        for(int i=0; i<userDrawResDtoList.size(); i++){
            Long likeCounts=queryFactory
                    .select(likes.drawNo.count())
                    .from(likes)
                    .where(likes.drawNo.drawNo.eq(userDrawResDtoList.get(i).getDrawNo()))
                    .fetchOne();
            UserDrawResDto userDrawResDto=userDrawResDtoList.get(i);
            userDrawResDto.setLikeCnt(likeCounts);
            userDrawResDtoList.set(i, userDrawResDto);
        }

        return userDrawResDtoList;
    }

    private BooleanExpression eqCategory(int num){
        if(num != -1){
            return draw.categoryNo.categoryNo.eq(num);
        }
        return null;
    }

    private List<OrderSpecifier> sortByField(boolean like, boolean date ){
        List<OrderSpecifier> orderSpecifiers=new ArrayList<>();
        if(date) orderSpecifiers.add(draw.drawRecentDate.desc());
        if(like) orderSpecifiers.add(likes.drawNo.count().desc());
        return orderSpecifiers;
    }
}
