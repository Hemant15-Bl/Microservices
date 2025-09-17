package com.java.main.services.config;

import java.util.ArrayList;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;


@Configuration
public class UserConfig {
	
	private Logger logger = LoggerFactory.getLogger(UserConfig.class);
	
	@Bean
	@LoadBalanced
	 RestTemplate restTemplate() {
		RestTemplate restTemplate= new RestTemplate();
		
		restTemplate.getInterceptors().add((request, body, execution) -> {
            HttpServletRequest currentRequest =
                    ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                            .getRequest();

            String authHeader = currentRequest.getHeader("Authorization");
            logger.info("header from resttemplate : {} ",authHeader);
            if (authHeader != null) {
                request.getHeaders().add("Authorization", authHeader);
            }

            return execution.execute(request, body);
        });
		return restTemplate;
	}
	
//	@Bean
//	@LoadBalanced
//	 RestTemplate restTemplate(RestTemplateBuilder builder) {
//		return builder.build();
//	}
	
}
