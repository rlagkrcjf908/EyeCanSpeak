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

    public PrincipalDetails(Users users, Map<String, Object> attributes){
        this.users=users;
        this.attributes=attributes;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return users.getUsersName();
    }

    @Override
    public boolean isAccountNonExpired() { // true = expire x
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

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
