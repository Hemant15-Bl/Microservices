package com.java.main.externalservices;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.java.main.entites.Rating;
import com.java.main.services.payload.RatingDto;


@FeignClient("Rating-Service")
@Service
public interface RatingService {
	
	@PostMapping("/rating")
	public RatingDto createRating(Rating rating);
	
	@PutMapping("/rating/{ratingId}")
	public RatingDto updateRating(@PathVariable String ratingid, Rating rating);
	
	@DeleteMapping("/rating/{ratingId}")
	public void deleteRating(@PathVariable String ratingid);
	

}
