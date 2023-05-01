package com.ecs.api.dto.res;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class UserDrawResDto {
    private int draw_no;
    private String draw_drawing;
    private LocalDateTime draw_date;
    private String category_nm;
    private boolean draw_post_tf;
    private boolean like;
    private Long like_cnt;

    public UserDrawResDto(int drawNo, String drawDrawing, LocalDateTime drawDate, String categoryNM, boolean drawPostTF) {
        this.draw_no = drawNo;
        this.draw_drawing = drawDrawing;
        this.draw_date = drawDate;
        this.category_nm = categoryNM;
        this.draw_post_tf=drawPostTF;
    }
}
