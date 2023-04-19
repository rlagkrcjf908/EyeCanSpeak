package com.ecs.api.dto.req;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DrawPostReq {
    @JsonProperty("usersNo")
    int usersNo;

    @JsonProperty("subjectNM")
    String subjectNM;

    @JsonProperty("drawPostTF")
    boolean drawPostTF;
}
