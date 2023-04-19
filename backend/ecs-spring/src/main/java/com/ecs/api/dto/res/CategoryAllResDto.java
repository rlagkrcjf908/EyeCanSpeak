package com.ecs.api.dto.res;

import com.ecs.api.entity.Category;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CategoryAllResDto {
    int categoryNo;
    String categoryNM;

    public static List<CategoryAllResDto> of(List<Category> categories){
        List<CategoryAllResDto> categoryList= new ArrayList<>();
        for(int i = 0;i<categories.size();i++){
            CategoryAllResDto categoryAllResDto = new CategoryAllResDto();
            categoryAllResDto.setCategoryNo(categories.get(i).getCategoryNo());
            categoryAllResDto.setCategoryNM(categories.get(i).getCategoryNM());
            categoryList.add(categoryAllResDto);
        }

        return categoryList;
    }
}
