package com.java.main.Ctrl;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.java.main.externalService.ActivityLog;
import com.java.main.payload.APIResponse;
import com.java.main.payload.APIResponse.APIResponseBuilder;
import com.java.main.payload.ActivityLogDto;
import com.java.main.payload.HotelDto;
import com.java.main.services.HotelService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/v2/hotel")
public class HotelController {
	
	@Autowired 
	private HotelService hotelService;
	
	@Autowired
	private ActivityLog activityLog;
	
	@Value("${project.image}")
	private String path;
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/add")
	public  ResponseEntity<HotelDto> addata(@RequestBody HotelDto hotelDto) {
		HotelDto addedHotel = this.hotelService.addhotel(hotelDto);
		// for send activitlog in user-service
		ActivityLogDto log = new ActivityLogDto();
		log.setMessage("New Hotel ["+addedHotel.getName()+"] Added!");
		log.setActionType("HOTEL_ADD");
		this.activityLog.sendActivityLog(log);
		return new ResponseEntity<HotelDto>(addedHotel, HttpStatus.CREATED);
	}
	
	@GetMapping("/allhotels")
	public List<HotelDto> getalldata() {
		return hotelService.getAllHote();
	}
	
	@GetMapping("/{hotelId}")
	public ResponseEntity<HotelDto> getdata(@PathVariable String hotelId) {
		HotelDto ho = hotelService.getHotel(hotelId);
		if(ho!=null) {
			return ResponseEntity.ok(ho);
		}else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping("/image/upload/{hotelId}")
	public ResponseEntity<HotelDto> addImage(@RequestParam MultipartFile image, @PathVariable String hotelId) throws IOException{
		
		HotelDto hotelDto = this.hotelService.getHotel(hotelId);
		
		String imageName = hotelService.uploadImage(path, image);
		
		hotelDto.setImageName(imageName);
		HotelDto updateHotel = this.hotelService.updateHotel(hotelId, hotelDto);
		return new ResponseEntity<HotelDto>(updateHotel, HttpStatus.OK);
	}
	
	@GetMapping(value = "/image/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
	public void downloadImage(@PathVariable String imageName, HttpServletResponse response) throws IOException {
		InputStream inputStream = this.hotelService.getResource(path, imageName);
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(inputStream, response.getOutputStream());
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/edit/{hotelId}")
	public ResponseEntity<HotelDto> editData(@RequestBody HotelDto hotelDto, @PathVariable String hotelId){
		
		HotelDto updateHotel = this.hotelService.updateHotel(hotelId, hotelDto);
		
		// for send activitlog in user-service
		ActivityLogDto log = new ActivityLogDto();
		log.setMessage("Updated Hotel ["+updateHotel.getName()+"] Details!");
		log.setActionType("HOTEL_EDIT");
		this.activityLog.sendActivityLog(log);
		return new ResponseEntity<HotelDto>(updateHotel, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/delete/{hotelId}")
	public ResponseEntity<?> removeData(@PathVariable String hotelId){
		this.hotelService.removeHotel(hotelId);
		
		// for send activitlog in user-service
		ActivityLogDto log = new ActivityLogDto();
		log.setMessage("Deleted Hotel Records!");
		log.setActionType("HOTEL_DELETE");
		this.activityLog.sendActivityLog(log);
		APIResponse apiResponse = APIResponse.builder().message("Hotel Removed Successfully!").success(true).status(HttpStatus.NO_CONTENT).build();
		return new ResponseEntity<APIResponse>(apiResponse, HttpStatus.NO_CONTENT);
	}
}
