package com.ecs.api.dto.res;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class DrawResDto {
    int drawNo;
    String drawDrawing;
    LocalDateTime drawDate;
    String categoryNM;
    boolean like;
    String userNM;
    Long likeCnt;
}
