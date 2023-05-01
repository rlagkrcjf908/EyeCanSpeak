package com.ecs.api.dto.req;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LikeReqDto {

    @JsonProperty("drawNo")
    int drawNo;
}
