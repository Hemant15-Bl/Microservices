package com.java.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class SpringProject15ConfigServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringProject15ConfigServerApplication.class, args);
	}

}
