package com.java.main.dto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.java.main.dto.groups.OnCreate;
import com.java.main.dto.groups.OnUpdate;
import com.java.main.externalServices.Role;

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
	
	@NotEmpty(groups = {OnCreate.class, OnUpdate.class})
	@Size(min = 3, message = "name should be greater than 3 character !!", groups = {OnCreate.class, OnUpdate.class})
	private String name;
	
	@NotEmpty(groups = {OnCreate.class, OnUpdate.class})
	@Email(message = "enter valid email !!", groups = {OnCreate.class, OnUpdate.class})
	private String email;
	
	@NotEmpty(groups = {OnCreate.class})
	@Size(min = 4, max = 9, message = "password should be greater than 3 and one special character !!", groups = {OnCreate.class, OnUpdate.class})
	private String password;
	
	@NotEmpty(groups = {OnCreate.class, OnUpdate.class})
	private String contactNo;
	
	@NotEmpty(groups = {OnCreate.class, OnUpdate.class})
	private String address;
	
	private String imageName;
	
	private List<Role> roles = new ArrayList<>();
//	private List<RatingDto> rating = new ArrayList<RatingDto>();
	
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
