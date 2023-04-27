package com.ecs.api.config.oauth;

import com.ecs.api.config.jwt.JwtTokenProvider;
import com.ecs.api.entity.Users;
import com.ecs.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomOAuthSuccessHandler implements AuthenticationSuccessHandler {
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        PrincipalDetails principalDetails= (PrincipalDetails) authentication.getPrincipal();

        Users users=userRepository.findByUsersId(principalDetails.getPassword()).orElseThrow(()->new IllegalArgumentException("유저가 없습니다."));

        String jwtToken=jwtTokenProvider.createToken(users);
        String refreshToken=jwtTokenProvider.createRefreshToken(users);

        Cookie accessCookie=new Cookie("accessToken", jwtToken);
        accessCookie.setPath("/");
        accessCookie.setMaxAge(1000 * 60 * 60);

        Cookie refreshCookie=new Cookie("refreshToken", refreshToken);
        refreshCookie.setPath("/");
        refreshCookie.setSecure(true);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setMaxAge(1000*60*60*24);

        response.addCookie(accessCookie);
        response.addCookie(refreshCookie);

        response.setHeader("AccessToken", jwtToken);

        response.sendRedirect("https://k8d204.p.ssafy.io/");
    }
}
