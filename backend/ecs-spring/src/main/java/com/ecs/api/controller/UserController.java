package com.ecs.api.controller;

import com.ecs.api.config.oauth.PrincipalDetails;
import com.ecs.api.dto.res.UserDrawResDto;
import com.ecs.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/list")
    public ResponseEntity<?> getDrawList(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                         @RequestParam(value = "category_no", required = false, defaultValue = "-1") int num,
                                         @RequestParam(value = "like", required = false, defaultValue = "false") boolean like,
                                         @RequestParam(value="date", required = false, defaultValue = "false") boolean date){
        try{
            List<UserDrawResDto> userDrawList=userService.findUserDrawList(principalDetails.getUsers(), num , like, date);
            return ResponseEntity.ok().body(userDrawList);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }

    }

}
