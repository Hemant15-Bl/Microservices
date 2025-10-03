package com.java.main.ctrl;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
//import org.springframework.cloud.openfeign.support.FeignHttpClientProperties.OkHttp;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.java.main.entites.User;

import com.java.main.services.UserService;
import com.java.main.services.payload.UserDto;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/v1/user")
public class UserCtrl {

    private final ModelMapper modelMapper;
	
	@Autowired
	private UserService userService;
	
	private Logger logger = LoggerFactory.getLogger(UserCtrl.class);
	
	@Value("${project.image}")
	private String path;

    UserCtrl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/add")
	public UserDto addData(@RequestBody UserDto userDto) {
		return userService.addUser(userDto);
		
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/allusers")
	public List<UserDto> getAllData() {
		return userService.getAllUser();
		
	}
	
	@PutMapping("/update/{userId}")
	public ResponseEntity<UserDto> editData(@PathVariable String userId, @RequestBody UserDto userDto){
		UserDto updateUser = this.userService.updateUser(userId, userDto);
		return new ResponseEntity<>(updateUser, HttpStatus.OK);
	}
	
	int retrycount =1;
	
//	@PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.userId")
	@GetMapping("/{userId}")
//	@CircuitBreaker(name = "ratingHotelBreaker", fallbackMethod = "ratingHotelFallback")
//	@Retry(name = "ratingHotelService", fallbackMethod = "ratingHotelFallback")
	@RateLimiter(name = "empRateLimiter",fallbackMethod = "ratingHotelFallback")
	public ResponseEntity<UserDto> getData(@PathVariable String userId) {
		logger.info("Retry-Count : {}", retrycount);
		retrycount++;
		UserDto user = userService.getUser(userId);
		if(user!=null) {
			return ResponseEntity.ok(user);
		}else {
			return ResponseEntity.notFound().build();
		}
	}
	
	public ResponseEntity<UserDto> ratingHotelFallback(String userid,Exception ex){
		logger.info("Fall back executed because service is down : ", ex.getMessage());
		UserDto user = new UserDto();
				user.setName("dummy");
				user.setContactNo("xxxx-xxxx-xx");
				user.setAddress("No Service Is Available Because Service Is down!");
				user.setUserId("xxxxx");
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@PostMapping("/add/image/{userId}")
	public ResponseEntity<UserDto> addImage(@RequestParam MultipartFile image,@PathVariable String userId) throws IOException{
		UserDto userDto = this.userService.getUser(userId);
		
		
		
		String fileName = this.userService.uploadImage(path, image);
		
		userDto.setImageName(fileName);
		UserDto updateUser = this.userService.updateUser(userId, userDto);
		return new ResponseEntity<UserDto>(updateUser, HttpStatus.OK);
	}
	
	@GetMapping(value = "/image/{imagename}", produces = MediaType.IMAGE_JPEG_VALUE)
	public void downloadImage(@PathVariable String imagename, HttpServletResponse response) throws IOException{
		InputStream inputStream = this.userService.getResource(path, imagename);
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(inputStream, response.getOutputStream());
	}
}
