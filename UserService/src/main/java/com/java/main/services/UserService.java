package com.java.main.services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.java.main.entites.User;
import com.java.main.services.payload.UserDto;

public interface UserService {
	public UserDto addUser(UserDto userDto);
	public List<UserDto> getAllUser();
	public UserDto getUser(String id);
	public UserDto register(UserDto userdto);
	public UserDto updateUser(String userId, UserDto userDto);
	public String uploadImage(String path, MultipartFile file) throws IOException;
	public InputStream getResource(String path, String fileName) throws FileNotFoundException;
}
