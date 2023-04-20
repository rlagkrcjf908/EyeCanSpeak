package com.ecs.api.config.oauth;

import com.ecs.api.entity.Users;
import com.ecs.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Optional;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // load user info
        OAuth2User oAuth2User=super.loadUser(userRequest);

        //get user info
        String registrationId=userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName=userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        OAuth2Attributes attributes=OAuth2Attributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        // find user
        Optional<Users> user=userRepository.findByUsersId(attributes.getEmail());
        Users users;

        if(user.isEmpty()){ // sign up
            users= Users.builder()
                    .usersId(attributes.getEmail())
                    .usersName(attributes.getName())
                    .usersNickName(attributes.getNickname())
                    .build();
            userRepository.save(users);
        }else{
            users=user.get();
        }

        return new PrincipalDetails(users, attributes.getAttribute());
    }
}
