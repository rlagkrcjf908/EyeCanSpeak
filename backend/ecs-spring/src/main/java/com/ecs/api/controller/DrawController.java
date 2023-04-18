package com.ecs.api.controller;

import com.ecs.api.dto.req.AwsS3;
import com.ecs.api.dto.res.BaseResponseBody;
import com.ecs.api.service.DrawService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/draw")
public class DrawController {
    @Autowired
    private final DrawService drawService;

    @PostMapping("/store")
    public ResponseEntity<?extends BaseResponseBody> upload(@RequestPart(value="File",required=false)MultipartFile multipartFile){
        System.out.println(multipartFile);
        try{
            AwsS3 awsS3 = drawService.upload(multipartFile,"upload");
            if(awsS3 != null) {
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
            }
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Fail"));

        }
        catch (Exception e){
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Fail"));
        }

    }

    @DeleteMapping()
    public ResponseEntity<?extends BaseResponseBody> remove(AwsS3 awsS3){
        try{
            drawService.remove(awsS3);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));

        }
        catch (Exception e){
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Fail"));
        }

    }
}
