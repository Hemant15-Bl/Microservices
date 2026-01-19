package com.java.main.externalservices;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.java.main.entites.Rating;
import com.java.main.services.payload.RatingDto;


@FeignClient(name = "RATING-SERVICE", fallback = RatingServiceFallback.class)
public interface RatingService {
	
	@GetMapping("/api/v3/rating/users/{userId}")
	public List<RatingDto> getRating(@PathVariable String userId);
	
	@DeleteMapping("/api/v3/rating/remove/{userId}")
	public void removeRating(@PathVariable String userId); 
}
