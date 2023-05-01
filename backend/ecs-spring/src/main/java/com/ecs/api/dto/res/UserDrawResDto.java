package com.ecs.api.dto.res;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class UserDrawResDto {
    private int drawNo;
    private String drawDrawing;
    private LocalDateTime drawDate;
    private String categoryNm;
    private boolean drawPostTF;
    private boolean like;
    private Long likeCnt;

    public UserDrawResDto(int drawNo, String drawDrawing, LocalDateTime drawDate, String categoryNm, boolean drawPostTF) {
        this.drawNo = drawNo;
        this.drawDrawing = drawDrawing;
        this.drawDate = drawDate;
        this.categoryNm = categoryNm;
        this.drawPostTF=drawPostTF;
    }
}
