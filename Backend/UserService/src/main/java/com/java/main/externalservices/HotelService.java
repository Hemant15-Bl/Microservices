package com.java.main.externalservices;

import org.springframework.cloud.openfeign.FeignClient;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.java.main.services.config.FeignClientInterceptorConfig;
import com.java.main.services.payload.HotelDto;

@FeignClient(name = "HOTEL-SERVICE", configuration = FeignClientInterceptorConfig.class)
public interface HotelService {
	
	@GetMapping("/hotel/{hotelId}")
	HotelDto gethotel(@PathVariable String hotelId);
	
	
}
