package com.java.main.services.payload;

import java.util.ArrayList;


import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.java.main.entites.Role;
//import com.java.main.entities.Rating;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {

	
	private String userId;
	
	@NotEmpty
	@Size(min = 3, message = "name should be greater than 3 character !!")
	private String name;
	
	@NotEmpty
	@Email(message = "enter valid email !!")
	private String email;
	
	@NotEmpty
	@Size(min = 4, max = 9, message = "password should be greater than 3 and one special character !!")
	private String password;
	
	@NotEmpty
	private String contactNo;
	
	@NotEmpty
	private String address;
	
	private String imageName;
	
	private List<Role> roles = new ArrayList<>();
	private List<RatingDto> rating = new ArrayList<RatingDto>();
	
//	@JsonIgnore
//	public String getPassword() {
//		return this.password;
//	}
//	
//	@JsonProperty
//	public void setPassword(String password) {
//		this.password = password;
//	}
}
