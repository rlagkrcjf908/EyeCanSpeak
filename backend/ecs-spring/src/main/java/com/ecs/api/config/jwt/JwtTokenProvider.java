package com.ecs.api.config.jwt;

import com.ecs.api.config.oauth.PrincipalDetails;
import com.ecs.api.entity.JwtToken;
import com.ecs.api.entity.Users;
import com.ecs.api.repository.JwtTokenRepository;
import com.ecs.api.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final UserRepository userRepository;
    private final JwtTokenRepository jwtTokenRepository;

    @Value("${jwt.secretKey}")
    String secretKey;
    @Value("${jwt.refreshKey}")
    String refreshKey;

    @PostConstruct
    protected void init(){
        secretKey= Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
        refreshKey=Base64.getEncoder().encodeToString(refreshKey.getBytes(StandardCharsets.UTF_8));
    }

    public String createToken(Users users){

        return Jwts.builder()
                .setClaims(createClaims(users, 1000L * 60L * 60L)) // 1시간
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String createRefreshToken(Users users){
        String refreshToken=Jwts.builder()
                .setClaims(createClaims(users, 1000L*60L*60L*24L)) // 1일
                .signWith(SignatureAlgorithm.HS256, refreshKey)
                .compact();

        JwtToken jwtToken;
        if(jwtTokenRepository.existsByUsersNo(users.getUsersNo())){
            jwtToken=jwtTokenRepository.findByUsersNo(users.getUsersNo()).orElseThrow(()->new IllegalArgumentException("token 없음"));
            jwtToken.setTokenRefresh(refreshToken);
        }else{
            jwtToken=JwtToken.builder()
                    .tokenRefresh(refreshToken)
                    .usersNo(users.getUsersNo())
                    .build();
        }
        jwtTokenRepository.save(jwtToken);
        return refreshToken;
    }

    public Claims createClaims(Users users, long expire){
        Claims claims= Jwts.claims()
                .setSubject(users.getUsersId())
                .setIssuedAt(new Date()) // 발행일
                .setExpiration(new Date(System.currentTimeMillis()+ expire));
        claims.put("name", users.getUsersNickName());
        claims.put("no", users.getUsersNo());

        return claims;
    }

    // 필터에서 인증 성공시 SecurityContextHolder에 저장할 Authenticatiion 생성
    public Authentication getAuthentication(String token){
        String email=Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
        PrincipalDetails users=new PrincipalDetails(userRepository.findByUsersId(email)
                .orElseThrow(()->new IllegalArgumentException("유저가 없습니다.")));

        return new UsernamePasswordAuthenticationToken(users.getUsers(), "", users.getAuthorities());
    }

    public String resolveToken(HttpServletRequest request, String type){
        String token=request.getHeader("Authorization");
        if(type.equals("accessToken")){
            if(token.startsWith("Bearer")){
                token=token.replace("Bearer ","");
            }
        }
        return token;
    }

    // Claim의 유효기간 체크
    public boolean validationToken(String token){
        try{
            Jws<Claims> claims=Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        }catch (Exception e){
            return false;
        }
    }
}
