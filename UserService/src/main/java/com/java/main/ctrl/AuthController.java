package com.java.main.ctrl;


import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.main.entites.User;
import com.java.main.security.JwtAuthResponse;
import com.java.main.security.JwtTokenHelper;
import com.java.main.services.UserService;
import com.java.main.services.exception.ApiException;
import com.java.main.services.payload.JwtAuthRequest;
import com.java.main.services.payload.UserDto;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

	private final ModelMapper modelMapper;

	@Autowired
	private JwtTokenHelper jwtHelper;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserService userService;
	
	private Logger logger = LoggerFactory.getLogger(AuthController.class);
	
	public AuthController(ModelMapper modelMapper) {
		this.modelMapper = modelMapper;
	}
	
	@PostMapping("/login")
	public ResponseEntity<JwtAuthResponse> createToken(@RequestBody JwtAuthRequest request){
		logger.info("username from auth : {} ",request.getUsername());
//		this.authenticate(request.getUsername(), request.getPassword());
		
		authenticationManager.authenticate(
	            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
	        );
		
		 UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
		  String token = this.jwtHelper.generateToken(userDetails);
		 
		 JwtAuthResponse response = new JwtAuthResponse();
		 response.setToken(token);
		 response.setUserDto(this.modelMapper.map(userDetails, UserDto.class));
		 
		 return new ResponseEntity<JwtAuthResponse>(response, HttpStatus.OK);
	}

//	private void authenticate(String username, String password) {
//		
//		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
//		
//		try {
//			this.authenticationManager.authenticate(authenticationToken);
//		}catch (BadCredentialsException e) {
//			e.printStackTrace();
//			throw new ApiException("Invalid username or password!!");
//		}
//	}
	
	@PostMapping("/signup")
	public ResponseEntity<UserDto> signUp(@Valid @RequestBody UserDto userdto){
		UserDto register = this.userService.register(userdto);
		return new ResponseEntity<UserDto>(register, HttpStatus.CREATED);
	}
}
