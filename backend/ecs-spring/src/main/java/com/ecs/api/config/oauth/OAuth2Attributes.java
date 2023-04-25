package com.ecs.api.config.oauth;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Builder
@Getter
public class OAuth2Attributes {
    private Map<String, Object> attribute;
    private String userNameAttributeKey;
    private String email;
    private String name;
    private String nickname;

    public static OAuth2Attributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes){
        return ofKaKao(userNameAttributeName, attributes);
    }

    private static OAuth2Attributes ofKaKao(String userNameAttributeName, Map<String, Object> attributes){
        Map<String, Object> kakaoAccount= (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile= (Map<String, Object>) kakaoAccount.get("profile");
        return OAuth2Attributes.builder()
                .name((String)kakaoProfile.get("nickname"))
                .nickname((String)kakaoProfile.get("nickname"))
                .email((String) kakaoAccount.get("email"))
                .attribute(attributes)
                .userNameAttributeKey(userNameAttributeName)
                .build();
    }
}
