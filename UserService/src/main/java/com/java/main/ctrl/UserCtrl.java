package com.java.main.ctrl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.cloud.openfeign.support.FeignHttpClientProperties.OkHttp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.main.entites.User;

import com.java.main.services.UserService;
import com.java.main.services.payload.UserDto;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;

@RestController
@RequestMapping("/api/v1/user")
public class UserCtrl {
	
	@Autowired
	private UserService userService;
	
	private Logger logger = LoggerFactory.getLogger(UserCtrl.class);
	
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
	
	int retrycount =1;
	
	@PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.userId")
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
	
	public ResponseEntity<User> ratingHotelFallback(String userid,Exception ex){
		logger.info("Fall back executed because service is down : ", ex.getMessage());
		User user = User.builder()
				.name("dummy")
				.contactNo("xxxx-xxxx-xx")
				.address("No Service Is Available Because Service Is down!")
				.userId("xxxxx").build();
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
}
