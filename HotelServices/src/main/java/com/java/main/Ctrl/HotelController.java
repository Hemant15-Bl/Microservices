package com.java.main.Ctrl;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.java.main.entities.Hotel;
import com.java.main.payload.HotelDto;
import com.java.main.services.HotelService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/hotel")
public class HotelController {
	
	@Autowired 
	private HotelService hoservice;
	
	@Value("${project.image}")
	private String path;
	
//	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/add")
	public HotelDto addata(@RequestBody HotelDto hotelDto) {
		return hoservice.addhotel(hotelDto);
	}
	
	//@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/allhotels")
	public List<HotelDto> getalldata() {
		return hoservice.getAllHote();
	}
	
	@GetMapping("/{hotelId}")
	public ResponseEntity<HotelDto> getdata(@PathVariable String hotelId) {
		HotelDto ho = hoservice.getHotel(hotelId);
		if(ho!=null) {
			return ResponseEntity.ok(ho);
		}else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping("/image/upload/{hotelId}")
	public ResponseEntity<HotelDto> addImage(@RequestParam MultipartFile image, @PathVariable String hotelId) throws IOException{
		
		HotelDto hotelDto = this.hoservice.getHotel(hotelId);
		
		String imageName = hoservice.uploadImage(path, image);
		
		hotelDto.setImageName(imageName);
		HotelDto updateHotel = this.hoservice.updateHotel(hotelId, hotelDto);
		return new ResponseEntity<HotelDto>(updateHotel, HttpStatus.OK);
	}
	
	@GetMapping(value = "/image/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
	public void downloadImage(@PathVariable String imageName, HttpServletResponse response) throws IOException {
		InputStream inputStream = this.hoservice.getResource(path, imageName);
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(inputStream, response.getOutputStream());
	}
	
	@PutMapping("/edit/{hotelId}")
	public ResponseEntity<HotelDto> editData(@RequestBody HotelDto hotelDto, @PathVariable String hotelId){
		HotelDto hotel = this.hoservice.updateHotel(hotelId, hotelDto);
		return new ResponseEntity<HotelDto>(hotel, HttpStatus.OK);
	}
}
