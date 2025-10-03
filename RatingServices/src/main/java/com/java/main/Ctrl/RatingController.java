package com.java.main.Ctrl;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.main.entities.Rating;
import com.java.main.payload.RatingDto;
import com.java.main.services.RatingService;

@RestController
@RequestMapping("/rating")
public class RatingController {
		
	@Autowired
	private RatingService ratservice;
	
	@PostMapping("/add")
	public RatingDto addData(@RequestBody RatingDto ratingDto) {
		return ratservice.addRating(ratingDto);
	}
	
	//@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/allratings")
	public ResponseEntity<List<RatingDto>> getAllData() {
		return ResponseEntity.ok(ratservice.getRating());
	}
	
	@GetMapping("/users/{userId}")
	public ResponseEntity<List<RatingDto>> getempData(@PathVariable String userId) {
		return ResponseEntity.ok(ratservice.getUserRating(userId));
	}
	
	@GetMapping("/hotels/{hotelId}")
	public ResponseEntity<List<RatingDto>> gethotelData(@PathVariable String hotelId) {
		return ResponseEntity.ok(ratservice.getHotelRating(hotelId));
	}
}
