package com.java.main.services;

import java.util.Arrays;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.java.main.services.exception.ResourceNotFoundException;
import com.java.main.services.payload.AppConstant;
import com.java.main.services.payload.HotelDto;
import com.java.main.services.payload.RatingDto;
import com.java.main.services.payload.UserDto;
import com.java.main.entites.Rating;
import com.java.main.entites.Role;
import com.java.main.entites.User;

import com.java.main.externalservices.HotelService;

import com.java.main.repository.RoleRepository;
import com.java.main.repository.UserRepository;

@Service
public class UserServiceImp implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private HotelService hotelService;

	private Logger logger = LoggerFactory.getLogger(UserServiceImp.class);

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RoleRepository roleRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public UserDto addUser(UserDto userDto) {
		User user = this.modelMapper.map(userDto, User.class);
		
		String randomid = UUID.randomUUID().toString();
		
		user.setUserId(randomid);
		
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		
		Role role = this.roleRepo.findById(AppConstant.ADMIN_USER).get();
		user.getRoles().add(role);
		User saved = userRepository.save(user);
		return this.modelMapper.map(saved, UserDto.class);
	}

	@Override
	public List<UserDto> getAllUser() {
		// TODO Auto-generated method stub
		List<User> users = userRepository.findAll();

		List<UserDto> list = users.stream().map(user -> (this.modelMapper.map(user, UserDto.class)))
				.collect(Collectors.toList());
		return list;
	}

	@Override
	public UserDto getUser(String id) {
		// TODO Auto-generated method stub
		User user = userRepository.findById(id).orElseThrow(
				(() -> new ResourceNotFoundException("User with given id " + id + " is not found on server!!")));

		logger.info("User Name :{} ",user.getName());
		RatingDto[] ratingOfUser = restTemplate.getForObject("http://RATING-SERVICE/rating/users/"+user.getUserId(), RatingDto[].class);
		logger.info("{} : ", ratingOfUser);
		
		List<RatingDto> ratings = Arrays.stream(ratingOfUser).toList();
		
		List<RatingDto> ratinglist = ratings.stream().map(rating -> {
			//http://localhost:8082/hotels/7578bd67-cfb8-4cea-88cc-56d630cf8bef
			//RatingDto rat = new RatingDto();
//			HotelDto forEntity = restTemplate.getForObject("http://HOTEL-SERVICE/hotel/"+rating.getHotelId(), HotelDto.class);
//			Hotel hotel = forentity.getBody();
//			logger.info("response status code: ", forentity.getStatusCode());
			HotelDto hotel = hotelService.gethotel(rating.getHotelId());
			
			rating.setHotel(hotel);
			return rating;
		}).collect(Collectors.toList());
		
		List<Rating> list = ratinglist.stream().map(rate -> (this.modelMapper.map(rate, Rating.class))).collect(Collectors.toList());
		user.setRating(list);
		return this.modelMapper.map(user, UserDto.class);
	}

	@Override
	public UserDto register(UserDto userdto) {
		User user = this.modelMapper.map(userdto, User.class);

		String randomid = UUID.randomUUID().toString();
		user.setUserId(randomid);
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));

		Role role = this.roleRepo.findById(AppConstant.NORMAL_USER).get();

		user.getRoles().add(role);

		User save = this.userRepository.save(user);
		return this.modelMapper.map(save, UserDto.class);
	}

}
