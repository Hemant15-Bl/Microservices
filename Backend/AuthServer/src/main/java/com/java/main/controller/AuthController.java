package com.java.main.controller;

import java.util.ArrayList;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//import com.java.main.Service.AuthUserService;
import com.java.main.Service.UserServiceImpl;
import com.java.main.dto.ActivityLogDto;
import com.java.main.dto.UserDto;
import com.java.main.exception.APIResponse;
import com.java.main.exception.ResourceNotFoundException;
import com.java.main.externalServices.User;
import com.java.main.externalServices.UserService;
import com.java.main.repository.AuthUserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v4")
public class AuthController {

	@Autowired
	private UserServiceImpl userServiceImpl;

	@Autowired
	private UserService userService;

//	@Autowired
//	private AuthUserService authUserService;

	@Autowired
	private AuthUserRepository authUserRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private ModelMapper modelMapper;

	// SCENARIO 1: Public Registration (Stranger on the internet)
	@PostMapping("/auth/signup")
	public ResponseEntity<UserDto> registerPublicUser(@Valid @RequestBody UserDto userDto) {
		userDto.setRoles(null);
		UserDto registerUser = this.userServiceImpl.registerUser(userDto);
		return new ResponseEntity<UserDto>(registerUser, HttpStatus.CREATED);
	}

	// SCENARIO 2: Admin Registration (LoggedIn Admin creating staff/users)
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/auth/admin/create-user")
	public ResponseEntity<UserDto> registerByAdmin(@Valid @RequestBody UserDto userDto) {
		UserDto registerUser = this.userServiceImpl.registerUser(userDto);
		
		// for send activity for feign user-service
				ActivityLogDto log = new ActivityLogDto();
				log.setMessage("Added User [" + registerUser.getName() + "]");
				log.setActionType("USER_ADD");
				this.userService.sendActivityLog(log);
				
		return new ResponseEntity<UserDto>(registerUser, HttpStatus.CREATED);
	}

	
	@GetMapping("/me")
	public ResponseEntity<UserDto> getUser(Authentication auth) {
		if (auth != null && auth.isAuthenticated()) {
			Jwt jwt = (Jwt) auth.getPrincipal();
			String userId = jwt.getClaimAsString("user_id");
			User user = authUserRepository.findById(userId).get();
//			UserDto dto = this.authUserService.toDto(auth);
			return new ResponseEntity<UserDto>(this.modelMapper.map(user, UserDto.class), HttpStatus.OK);
		}

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}

	@PutMapping("/update/{userId}")
	public ResponseEntity<UserDto> editUser(@PathVariable String userId, @Valid @RequestBody UserDto userDto) {
		UserDto updateUser = this.userServiceImpl.update(userId, userDto);
		return new ResponseEntity<UserDto>(updateUser, HttpStatus.OK);
	}

	// 1. Normal user with required password
	@DeleteMapping("/delete/{userId}")
	public ResponseEntity<?> deleteUserById(@PathVariable String userId, @RequestParam String password) {
		User user = this.authUserRepository.findById(userId).orElseThrow();

		if (!passwordEncoder.matches(password, user.getPassword())) {
			return new ResponseEntity("Invalid credentials!", HttpStatus.UNAUTHORIZED);
		}

		this.userServiceImpl.deleteUser(userId);
		APIResponse apiResponse = APIResponse.builder().message("User Removed Successfully!").success(true)
				.status(HttpStatus.NO_CONTENT).build();
		return new ResponseEntity<>(apiResponse, HttpStatus.NO_CONTENT);
	}

	// 2. Admin to delete user
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/admin/delete/{userId}")
	public ResponseEntity<?> deleteUserByAdmin(@PathVariable String userId) {
		User user = this.authUserRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with Id: " + userId));

		this.userServiceImpl.deleteUser(userId);

		// for send activity for feign user-service
		ActivityLogDto log = new ActivityLogDto();
		log.setMessage("Delete User [" + user.getName() + "]");
		log.setActionType("USER_DELETE");
		this.userService.sendActivityLog(log);
		APIResponse apiResponse = APIResponse.builder().message("User Removed Successfully!").success(true)
				.status(HttpStatus.OK).build();
		return new ResponseEntity<>(apiResponse, HttpStatus.OK);
	}
	
//	public void 
}
