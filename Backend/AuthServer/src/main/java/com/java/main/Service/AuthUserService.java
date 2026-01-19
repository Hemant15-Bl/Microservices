//package com.java.main.Service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import org.springframework.security.core.Authentication;
//import org.springframework.security.oauth2.jwt.Jwt;
//import org.springframework.stereotype.Service;
//
//import com.java.main.dto.RatingDto;
//import com.java.main.dto.UserDto;
//import com.java.main.externalServices.Role;
//
//@Service
//public class AuthUserService {
//
//	public UserDto toDto(Authentication authentication) {
//		if (authentication == null) {
//			return null;
//		}
//
//		Object principal = authentication.getPrincipal();
//
//		UserDto userDto = new UserDto();
//		if (principal instanceof Jwt jwt) {
//			userDto.setEmail(jwt.getSubject());
//			userDto.setName(jwt.getClaimAsString("name"));
//			userDto.setUserId(jwt.getClaimAsString("user_id"));
//			userDto.setImageName(jwt.getClaimAsString("imageName"));
//			userDto.setContactNo(jwt.getClaimAsString("contactNo"));
//			userDto.setAddress(jwt.getClaimAsString("address"));
//			List<String> roles = jwt.getClaimAsStringList("roles");
//
//			// ---- String to Role
//			if (roles != null) {
//				List<Role> rol = roles.stream().map((rolename) -> {
//					Role role = new Role();
//					role.setName(rolename);
//					return role;
//				}).collect(Collectors.toList());
//				
//				userDto.setRoles(rol);
//			}
//
//		} else {
//			userDto.setEmail(authentication.getName());
//		}
//
//		return userDto;
//	}
//}
