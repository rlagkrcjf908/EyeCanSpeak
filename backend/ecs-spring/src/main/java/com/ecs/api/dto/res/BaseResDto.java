package com.ecs.api.dto.res;

import lombok.Getter;
import lombok.Setter;

/**
 * 서버 요청에대한 기본 응답값(바디) 정의.
 */
@Getter
@Setter
//@ApiModel("BaseResponseBody")
public class BaseResDto {
//	@ApiModelProperty(name="응답 메시지", example = "정상")
	String message = null;
//	@ApiModelProperty(name="응답 코드", example = "200")
	Integer statusCode = null;
	
	public BaseResDto() {}
	
	public BaseResDto(Integer statusCode){
		this.statusCode = statusCode;
	}
	
	public BaseResDto(Integer statusCode, String message){
		this.statusCode = statusCode;
		this.message = message;
	}
	
	public static BaseResDto of(Integer statusCode, String message) {
		BaseResDto body = new BaseResDto();
		body.message = message;
		body.statusCode = statusCode;
		return body;
	}
}
