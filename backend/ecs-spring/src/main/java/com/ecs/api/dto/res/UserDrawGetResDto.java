package com.ecs.api.dto.res;

import com.ecs.api.entity.Draw;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDrawGetResDto {
    private int drawNo;
    private String drawDrawing;
    private int categoryNo;
    private String categoryNM;
    private boolean drawPostTF;

    public UserDrawGetResDto(Draw draw){
        this.drawNo=draw.getDrawNo();
        this.categoryNo=draw.getCategoryNo().getCategoryNo();
        this.categoryNM=draw.getCategoryNo().getCategoryNM();
        this.drawPostTF=draw.isDrawPostTF();
    }
}
