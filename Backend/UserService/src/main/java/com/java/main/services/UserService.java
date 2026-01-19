package com.java.main.services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.java.main.entites.User;
import com.java.main.services.payload.UserDto;

public interface UserService {
	//create admin user
//	public UserDto addUser(UserDto userDto);
	
	//get all users
	public List<UserDto> getAllUser();
	
	//get user by userId
	public UserDto getUser(String id);
	
	//create normal user
	public UserDto register(UserDto userdto);
	
	//update user data by id
	public UserDto updateUser(String userId, UserDto userDto);
	
	//upload user photo
	public String uploadImage(String path, MultipartFile file) throws IOException;
	
	//get path + filename (random)
	public InputStream getResource(String path, String fileName) throws FileNotFoundException;
	
	//get user data by username
	public UserDto getUserByUsername(String username);
	
	//delete user data by id
	public void removeUserData(String userId);
	
	
}
