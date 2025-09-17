package com.java.main.payload;

import org.springframework.http.ResponseEntity;

import com.java.main.entities.Hotel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RatingDto {


	private String ratingId;
	private String userId;
	private String hotelId;
	private int rating;
	private String feedback;
	
	private HotelDto hotel;
}
