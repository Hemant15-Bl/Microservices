package com.java.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableDiscoveryClient
@ComponentScan(basePackages = "com.java.main.security")
public class SpringProject14ApiGatewayApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(SpringProject14ApiGatewayApplication.class, args);
	}

}
