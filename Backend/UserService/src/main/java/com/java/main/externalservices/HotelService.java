package com.java.main.externalservices;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.java.main.entites.Hotel;
import com.java.main.services.config.FeignClientInterceptorConfig;
import com.java.main.services.payload.HotelDto;

@FeignClient(name = "HOTEL-SERVICE", fallback = HotelServiceFallback.class)
public interface HotelService {
	
	@GetMapping("/api/v2/hotel/{hotelId}")
	Hotel gethotel(@PathVariable String hotelId);
	
	@GetMapping("/allhotels")
	List<Hotel> getAllHotels();
}
