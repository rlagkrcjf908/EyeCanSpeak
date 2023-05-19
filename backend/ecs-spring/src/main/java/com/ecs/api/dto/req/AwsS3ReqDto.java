package com.ecs.api.dto.req;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AwsS3ReqDto {
    private String key;
    private String path;

    public AwsS3ReqDto(){

    }
    @Builder
    public AwsS3ReqDto(String key, String path){
        this.key=key;
        this.path=path;
    }
}
