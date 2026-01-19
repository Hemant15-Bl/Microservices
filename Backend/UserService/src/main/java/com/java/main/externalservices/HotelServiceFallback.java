package com.java.main.externalservices;

import java.util.List;

import org.springframework.stereotype.Component;

import com.java.main.entites.Hotel;
import com.java.main.services.payload.HotelDto;

@Component
public class HotelServiceFallback implements HotelService{

	@Override
	public Hotel gethotel(String hotelId) {
		Hotel hotel = new Hotel();
		hotel.setAbout("Service Unavailable");
		hotel.setHotelId("xxxx-xxxx-xxxx");
		hotel.setName("Unknown Hotel");
		hotel.setLocation("Dummy");
		return hotel;
	}

	@Override
	public List<Hotel> getAllHotels() {
		Hotel hotel = new Hotel();
		hotel.setAbout("Service down!");
		hotel.setHotelId("0");
		hotel.setName("No hotels available!");
		hotel.setLocation("Dummy");
		return List.of(hotel);
	}

}
