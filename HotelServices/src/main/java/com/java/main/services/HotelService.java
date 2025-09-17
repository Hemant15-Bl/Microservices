package com.java.main.services;

import java.util.List;

import com.java.main.entities.Hotel;
import com.java.main.payload.HotelDto;

public interface HotelService {
	public HotelDto addhotel(HotelDto hotelDto);
	public List<HotelDto> getAllHote();
	public HotelDto getHotel(String hotelId);
}
