package com.ecs.api.config.oauth;

import com.ecs.api.entity.Users;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Data
public class PrincipalDetails implements OAuth2User, UserDetails {
    private Users users;
    private Map<String, Object> attributes;

    public PrincipalDetails(Users users){
        this.users=users;
    }

    public PrincipalDetails(Users users, Map<String, Object> attributes){
        this.users=users;
        this.attributes=attributes;
    }

    @Override
    public String getPassword() {
        return users.getUsersId(); // email
    }

    @Override
    public String getUsername() {
        return users.getUsersName();
    }

    /* 계정 만료 여부
    * true: 만료 x
    * false: 만료 o */
    @Override
    public boolean isAccountNonExpired() { // true = expire x
        return true;
    }

    /* 계정 잠김 여부
     * true: 잠금 x
     * false: 잠금 o */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /* 비밀번호 만료 여부
     * true: 만료 x
     * false: 만료 o */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /* 계정 활성화 여부
     * true: 활성화 o
     * false: 활성화 x */
    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    /* 해당 User의 권한을 반환 */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collect= new ArrayList<>();
        collect.add((GrantedAuthority) () -> "ROLE_USER");
        return collect;
    }

    @Override
    public String getName() {
        return users.getUsersName();
    }
}
