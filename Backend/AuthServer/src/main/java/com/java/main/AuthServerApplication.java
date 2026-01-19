package com.java.main;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.java.main.externalServices.Role;
import com.java.main.repository.AuthRoleRepository;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class AuthServerApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(AuthServerApplication.class, args);
	}
	
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Autowired
	private AuthRoleRepository authRoleRepo;

	@Override
	public void run(String... args) throws Exception {
		
		Role role = new Role();
		role.setId(501);
		role.setName("ROLE_NORMAL");
		
		Role role2 = new Role();
		role2.setId(502);
		role2.setName("ROLE_ADMIN");
		
		try {
			List<Role> list = List.of(role, role2);
			List<Role> roles = this.authRoleRepo.saveAll(list);
		}catch (Exception e) {
			e.printStackTrace();
		}
	}

}
