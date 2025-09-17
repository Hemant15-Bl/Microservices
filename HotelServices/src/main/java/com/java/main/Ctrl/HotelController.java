package com.java.main.Ctrl;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.main.entities.Hotel;
import com.java.main.payload.HotelDto;
import com.java.main.services.HotelService;

@RestController
@RequestMapping("/hotel")
public class HotelController {
	
	@Autowired 
	private HotelService hoservice;
	
	@PreAuthorize("hasRole('ADMIN') or #hotelId == authentication.principal.hotelId")
	@PostMapping("/add")
	public HotelDto addata(@RequestBody HotelDto hotelDto) {
		return hoservice.addhotel(hotelDto);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
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
}
