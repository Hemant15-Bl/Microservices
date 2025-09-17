package com.java.tp.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class SpringProject17ServiceRegistryApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringProject17ServiceRegistryApplication.class, args);
	}

}
