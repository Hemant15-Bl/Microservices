package com.java.main.services;

import java.util.List;

import com.java.main.entites.User;
import com.java.main.services.payload.UserDto;

public interface UserService {
	public UserDto addUser(UserDto userDto);
	public List<UserDto> getAllUser();
	public UserDto getUser(String id);
	public UserDto register(UserDto userdto);
	
}
