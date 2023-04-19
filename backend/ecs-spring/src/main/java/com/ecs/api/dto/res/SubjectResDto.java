package com.ecs.api.dto.res;

import com.ecs.api.entity.Subjects;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SubjectResDto {
    int subjectNo;

    String subjectNM;

    public static List<SubjectResDto> of(List<Subjects> subjects) {
        List<SubjectResDto> subjectList = new ArrayList<>();
        for (int i = 0; i < subjects.size(); i++) {
            SubjectResDto subjectResDto = new SubjectResDto();
            subjectResDto.setSubjectNo(subjects.get(i).getSubjectsNo());
            subjectResDto.setSubjectNM(subjects.get(i).getSubjectsNM());
            subjectList.add(subjectResDto);
        }
        return subjectList;
    }
}