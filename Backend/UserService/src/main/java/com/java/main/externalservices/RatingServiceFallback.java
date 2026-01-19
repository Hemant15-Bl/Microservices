package com.java.main.externalservices;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.java.main.services.payload.RatingDto;

@Component
public class RatingServiceFallback implements RatingService{

	@Override
	public List<RatingDto> getRating(String userId) {
		RatingDto ratingDto = new RatingDto();
		ratingDto.setUserId(userId);
		ratingDto.setHotelId("Unavailable!");
		ratingDto.setFeedback("Service Down!");
		ratingDto.setRatingId("0");
		ratingDto.setRating(0);
		List<RatingDto> list = Arrays.asList(ratingDto);
		return list;
	}

	@Override
	public void removeRating(String userId) {
		RatingDto ratingDto = new RatingDto();
		ratingDto.setUserId(userId);
		ratingDto.setHotelId("Unavailable!");
		ratingDto.setFeedback("Service Down!");
		ratingDto.setRatingId("0");
		ratingDto.setRating(0);
	}

}
