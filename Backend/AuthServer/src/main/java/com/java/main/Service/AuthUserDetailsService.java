package com.java.main.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.java.main.externalServices.User;
import com.java.main.externalServices.UserService;
import com.java.main.repository.AuthUserRepository;

@Service
public class AuthUserDetailsService implements UserDetailsService{
	
	@Autowired
	private AuthUserRepository authUserRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = this.authUserRepo.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username : "+username));
		System.out.println("Name :- "+user.getName());
		System.out.println("Email :- "+user.getEmail());
		System.out.println("Mobile :- "+user.getContactNo());
		
		return user;
	}

}
