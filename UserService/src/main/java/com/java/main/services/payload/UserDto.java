package com.java.main.services.payload;

import java.util.ArrayList;


import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.java.main.entites.Role;
//import com.java.main.entities.Rating;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {

	private String userId;
	private String name;
	private String email;
	private String password;
	private String contactNo;
	private String address;
	private Set<Role> roles = new HashSet<>();
	private List<RatingDto> rating = new ArrayList<RatingDto>();
}
