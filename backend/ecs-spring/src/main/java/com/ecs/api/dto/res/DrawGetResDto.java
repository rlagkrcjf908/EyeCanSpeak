package com.ecs.api.dto.res;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class DrawGetResDto {
    int drawNo;
    String drawDrawing;
    LocalDateTime drawRecentDate;
    Long count;
}
