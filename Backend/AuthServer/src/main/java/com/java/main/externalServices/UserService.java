package com.java.main.externalServices;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.java.main.dto.ActivityLogDto;
import com.java.main.dto.UserDto;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@FeignClient(name = "USER-SERVICE", path = "/api/v1")
public interface UserService {
	
	@GetMapping("/user/username/{username}")
	public UserDto getUserByUsername(@PathVariable String username);
	
	@PostMapping("/user/signup")
	public UserDto createUser(@Valid @RequestBody UserDto userDto);
	
	@PutMapping("/user/update/{userId}")
	public UserDto editUser(@PathVariable String userId, @RequestBody UserDto userDto);
	
	@DeleteMapping("/user/delete/{userId}")
	public void removeData(@PathVariable String userId);
	
	@PostMapping("/admin/log")
	public void sendActivityLog(@RequestBody ActivityLogDto activityLogDto);
	
//	@GetMapping(value = "/user/image/{imagename}", produces = MediaType.IMAGE_JPEG_VALUE)
//	public ResponseEntity<Resource> downloadImage(@PathVariable String imagename);
}
