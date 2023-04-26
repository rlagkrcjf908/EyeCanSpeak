package com.ecs.api.controller;

import com.ecs.api.dto.req.WriteReqDto;
import com.ecs.api.dto.res.BaseResDto;
import com.ecs.api.service.WriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/write")
public class WriteController {
    private final WriteService writeService;
    @PostMapping()
    public ResponseEntity<?extends BaseResDto> setWrite(@RequestParam("user_no")int userNo, @RequestBody WriteReqDto writeReqDto){
        try{
            writeService.setWrite(userNo,writeReqDto);
            return ResponseEntity.status(200).body(BaseResDto.of(200, "Success"));
        }
        catch (Exception e){
            return ResponseEntity.status(400).body(BaseResDto.of(400, "Fail"));
        }

    }
}
