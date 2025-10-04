package com.java.main.security;

import com.java.main.services.payload.UserDto;

import lombok.Data;

@Data
public class JwtAuthResponse {

	private String token;
	
//	private String expireAt;
	private UserDto userDto;
}
