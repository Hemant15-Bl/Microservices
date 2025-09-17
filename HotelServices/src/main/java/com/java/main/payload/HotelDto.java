package com.java.main.payload;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class HotelDto {

	private String hotelId;
	private String name;
	private String location;
	private String about;
}
