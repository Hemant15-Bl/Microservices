package com.java.main.services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.java.main.entities.Hotel;
import com.java.main.payload.HotelDto;

public interface HotelService {
	//create hotel
	public HotelDto addhotel(HotelDto hotelDto);
	
	//get all hotels
	public List<HotelDto> getAllHote();
	
	//get hotel by id
	public HotelDto getHotel(String hotelId);
	
	//update hotel data by id
	public HotelDto updateHotel(String hotelId, HotelDto hotelDto);
	
	//upload hotel image
	public String uploadImage(String path, MultipartFile file) throws IOException ;
	
	//get image path + filename(random)
	public InputStream getResource(String path, String fileName) throws FileNotFoundException ;
	
	//remove hotel data permanently
	public void removeHotel(String hotelId);
}
