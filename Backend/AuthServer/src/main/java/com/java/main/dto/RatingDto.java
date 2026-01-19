package com.java.main.dto;

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
