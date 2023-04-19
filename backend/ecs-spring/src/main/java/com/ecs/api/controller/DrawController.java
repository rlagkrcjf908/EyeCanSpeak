package com.ecs.api.controller;

import com.ecs.api.dto.req.AwsS3ReqDto;
import com.ecs.api.dto.req.DrawReqDto;
import com.ecs.api.dto.res.BaseResDto;
import com.ecs.api.service.DrawService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/draw")
public class DrawController {

    private final DrawService drawService;

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

    @DeleteMapping()
    public ResponseEntity<?extends BaseResDto> remove(AwsS3ReqDto awsS3ReqDto){
        try{
            drawService.remove(awsS3ReqDto);
            return ResponseEntity.status(200).body(BaseResDto.of(200, "Success"));

        }
        catch (Exception e){
            return ResponseEntity.status(400).body(BaseResDto.of(400, "Fail"));
        }

    }
}
