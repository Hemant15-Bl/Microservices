package com.java.main.services;

import java.util.List;

import com.java.main.entities.Rating;
import com.java.main.payload.RatingDto;

public interface RatingService {
	public RatingDto addRating(RatingDto ratingDto);
	
	//get all rating
	public List<RatingDto> getRating();
	
	//get all rating by Employee Id
	public	List<RatingDto> getUserRating(String userId);
	
		//get all rating by Hotel Id
	public	List<RatingDto> getHotelRating(String hotelId);
		
}
