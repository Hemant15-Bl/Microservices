package com.java.main.Ctrl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.main.externalService.ActivityLog;
import com.java.main.payload.APIResponse;
import com.java.main.payload.ActivityLogDto;
import com.java.main.payload.RatingDto;
import com.java.main.services.RatingService;

@RestController
@RequestMapping("/api/v3/rating")
public class RatingController {
		
	@Autowired
	private RatingService ratservice;
	
	@Autowired
	private ActivityLog activityLog;
	
	@PostMapping("/add")
	public ResponseEntity<RatingDto> addData(@RequestBody RatingDto ratingDto) {
		
		RatingDto addedRating = this.ratservice.addRating(ratingDto);
		
//		//for send activity-log in user-service
//		ActivityLogDto log = new ActivityLogDto();
//        log.setMessage("User [" + ratingDto.getUserId() + "] rated Hotel [" + ratingDto.getHotelId() + "]");
//        log.setActionType("RATING_ADD");
        
//        activityLog.sendActivityLog(log);
		return new ResponseEntity<>(addedRating, HttpStatus.CREATED);
	}
	
	@GetMapping("/allratings")
	public ResponseEntity<List<RatingDto>> getAllData() {
		return ResponseEntity.ok(ratservice.getRating());
	}
	
	@GetMapping("/users/{userId}")
	public ResponseEntity<List<RatingDto>> getempData(@PathVariable String userId) {
		return ResponseEntity.ok(ratservice.getUserRating(userId));
	}
	
	@GetMapping("/hotels/{hotelId}")
	public ResponseEntity<List<RatingDto>> gethotelData(@PathVariable String hotelId) {
		return ResponseEntity.ok(ratservice.getHotelRating(hotelId));
	}
	
	@GetMapping("/rating/{ratingId}")
	public ResponseEntity<RatingDto> getRatingData(@PathVariable String ratingId) {
		return ResponseEntity.ok(ratservice.getRatingById(ratingId));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/delete/{ratingId}")
	public ResponseEntity<APIResponse> deleteRating(@PathVariable String ratingId){
		RatingDto ratingDto = this.ratservice.getRatingById(ratingId);
		this.ratservice.removedRating(ratingId);
		
		//for send activity-log in user-service
				ActivityLogDto log = new ActivityLogDto();
		        log.setMessage("Delete Rating Of User [" + ratingDto.getUserId() + "] rated Hotel [" + ratingDto.getHotelId() + "]");
		        log.setActionType("RATING_DELETE");
		        
		        this.activityLog.sendActivityLog(log);
		APIResponse apiResponse = APIResponse.builder().message("Rating remove successfully!").success(true).status(HttpStatus.NO_CONTENT).build();
		return new ResponseEntity<APIResponse>(apiResponse, HttpStatus.NO_CONTENT);
	}
	
	@DeleteMapping("/remove/{userId}")
	public ResponseEntity<?> deleteRatingByUserId(@PathVariable String userId){
		this.ratservice.removeRatingByUserId(userId);
		return new ResponseEntity(HttpStatus.OK);
	}
}
