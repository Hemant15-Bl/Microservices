package com.java.main.services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.java.main.entities.Hotel;
import com.java.main.payload.HotelDto;

public interface HotelService {
	public HotelDto addhotel(HotelDto hotelDto);
	public List<HotelDto> getAllHote();
	public HotelDto getHotel(String hotelId);
	public HotelDto updateHotel(String hotelId, HotelDto hotelDto);
	public String uploadImage(String path, MultipartFile file) throws IOException ;
	public InputStream getResource(String path, String fileName) throws FileNotFoundException ;
}
