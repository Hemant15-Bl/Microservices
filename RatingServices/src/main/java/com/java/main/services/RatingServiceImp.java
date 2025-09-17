package com.java.main.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.main.entities.Rating;
import com.java.main.payload.RatingDto;
import com.java.main.repository.RatingRepository;

@Service
public class RatingServiceImp implements RatingService{
	
	@Autowired
	private RatingRepository ratrepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public RatingDto addRating(RatingDto ratingDto) {
		Rating rating = this.modelMapper.map(ratingDto, Rating.class);
		Rating saved = ratrepository.save(rating);
		return this.modelMapper.map(saved, RatingDto.class);
	}

	@Override
	public List<RatingDto> getRating() {
		
		List<Rating> ratings = ratrepository.findAll();
		
		List<RatingDto> ratingList = ratings.stream().map(rate -> (this.modelMapper.map(rate, RatingDto.class))).collect(Collectors.toList());
		return ratingList;
	}

	@Override
	public List<RatingDto> getUserRating(String userId) {
		
		List<Rating> userList = ratrepository.findByUserId(userId);
		
		List<RatingDto> list = userList.stream().map(user -> (this.modelMapper.map(user, RatingDto.class))).collect(Collectors.toList());
		return list;
	}

	@Override
	public List<RatingDto> getHotelRating(String hotelId) {
		
		List<Rating> hotelLiist = ratrepository.findByHotelId(hotelId);
		
		List<RatingDto> list = hotelLiist.stream().map(hotel -> (this.modelMapper.map(hotel, RatingDto.class))).collect(Collectors.toList());
		return list;
	}

}
