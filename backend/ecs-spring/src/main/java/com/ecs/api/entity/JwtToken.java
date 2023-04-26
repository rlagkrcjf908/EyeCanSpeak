package com.ecs.api.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "Token")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class JwtToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TOKEN_NO")
    private int tokenNo;

    @Column(name="TOKEN_REFRESH")
    private String tokenRefresh;

    @Column(name="USERS_NO")
    private int usersNo;

    public void setTokenRefresh(String token){
        this.tokenRefresh=token;
    }

}
