package com.java.main.services;

import java.util.List;

import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.main.entities.Hotel;
import com.java.main.exception.ResourceNotFound;
import com.java.main.payload.HotelDto;
import com.java.main.repository.HotelRepository;

@Service
public class HotelServiceImp implements HotelService{
	
	@Autowired
	private HotelRepository horepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public HotelDto addhotel(HotelDto hotelDto) {
		Hotel hotel = this.modelMapper.map(hotelDto, Hotel.class);
		String generateid = UUID.randomUUID().toString();
		hotel.setHotelId(generateid);
		Hotel saved = horepository.save(hotel);
		return this.modelMapper.map(saved, HotelDto.class);
	}

	@Override
	public List<HotelDto> getAllHote() {

		List<Hotel> hotels = horepository.findAll();
		List<HotelDto> list = hotels.stream().map(hotel -> (this.modelMapper.map(hotel, HotelDto.class))).collect(Collectors.toList());
		return list;
	}

	@Override
	public HotelDto getHotel(String hotelId) {
		
		Hotel hotel = horepository.findById(hotelId).orElseThrow(() -> new ResourceNotFound("Hotel With Id Not Found !!"));
		return this.modelMapper.map(hotel, HotelDto.class);
	}

}
