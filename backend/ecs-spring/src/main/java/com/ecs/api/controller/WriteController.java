package com.ecs.api.controller;

import com.ecs.api.config.oauth.PrincipalDetails;
import com.ecs.api.dto.req.WriteReqDto;
import com.ecs.api.dto.res.BaseResDto;
import com.ecs.api.dto.res.WriteResDto;
import com.ecs.api.service.WriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/write")
public class WriteController {
    private final WriteService writeService;
    @PostMapping()
    public ResponseEntity<?extends BaseResDto> setWrite(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                                        @RequestBody WriteReqDto writeReqDto){
            writeService.setWrite(principalDetails.getUsers(),writeReqDto);
            return ResponseEntity.status(200).body(BaseResDto.of(200, "Success"));
    }
    @PostMapping("/history")
    public ResponseEntity<WriteResDto> getWriteHistory(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody WriteReqDto writeReqDto){
            WriteResDto writeResDto = writeService.getWriteHistory(principalDetails.getUsers(),writeReqDto);
            return ResponseEntity.status(200).body(writeResDto);
    }

}
