package com.ecs.api.controller;

import com.ecs.api.dto.req.AwsS3ReqDto;
import com.ecs.api.dto.req.DrawReqDto;
import com.ecs.api.dto.res.BaseResDto;
import com.ecs.api.dto.res.CategoryAllResDto;
import com.ecs.api.dto.res.SubjectResDto;
import com.ecs.api.entity.Category;
import com.ecs.api.entity.Subjects;
import com.ecs.api.service.DrawService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/draw")
public class DrawController {

    private final DrawService drawService;
    //그림 주제 선택----------------------------------------------------------------------
    // 카테고리 불러오기
    @GetMapping("/category")
    public ResponseEntity<List<CategoryAllResDto>> getAllCategory(){
        try {
            List<Category> categories = drawService.getAllCategory();

            return ResponseEntity.status(200).body(CategoryAllResDto.of(categories));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
    // 주제 불러오기
    @GetMapping("/subject/{categoryNo}")
    public ResponseEntity<List<SubjectResDto>> getSubjects(@PathVariable("categoryNo") int categoryNo){
        try{
            List<Subjects> subjects = drawService.getSubjects(categoryNo);
            return ResponseEntity.status(200).body(SubjectResDto.of(subjects));
        }
        catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }


    }
    //그림 그리기 ------------------------------------------------------------------------
    //이미지 저장
    @PostMapping(value="/store",consumes = {MediaType.APPLICATION_JSON_VALUE,MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?extends BaseResDto> upload(@RequestPart(value = "data") DrawReqDto drawReqDto, @RequestPart(value="File")MultipartFile multipartFile){
        try{

            AwsS3ReqDto awsS3ReqDto = drawService.upload(drawReqDto,multipartFile);
            if(awsS3ReqDto != null) {
                return ResponseEntity.status(200).body(BaseResDto.of(200, "Success"));
            }
            return ResponseEntity.status(400).body(BaseResDto.of(400, "Fail"));

        }
        catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body(BaseResDto.of(400, "Fail"));
        }

    }
    // 이미지 수정
    @PutMapping(value="/store/{draw_no}",consumes = {MediaType.APPLICATION_JSON_VALUE,MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?extends BaseResDto> update(@PathVariable("draw_no")int drawNo,@RequestPart(value = "data") DrawReqDto drawReqDto, @RequestPart(value="File")MultipartFile multipartFile){
        try{
            AwsS3ReqDto awsS3ReqDto = drawService.update(drawNo,drawReqDto,multipartFile);
            if(awsS3ReqDto != null) {
                return ResponseEntity.status(200).body(BaseResDto.of(200, "Success"));
            }
            return ResponseEntity.status(400).body(BaseResDto.of(400, "Fail"));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body(BaseResDto.of(400, "Fail"));
        }
    }

    // 이미지 삭제
    @DeleteMapping()
    public ResponseEntity<?extends BaseResDto> remove(@RequestParam("draw_no")int drawNo){
        try{
            drawService.remove(drawNo);
            return ResponseEntity.status(200).body(BaseResDto.of(200, "Success"));

        }
        catch (Exception e){
            return ResponseEntity.status(400).body(BaseResDto.of(400, "Fail"));
        }

    }
}
