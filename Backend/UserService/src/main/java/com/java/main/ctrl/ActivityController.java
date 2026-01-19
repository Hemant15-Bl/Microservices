package com.java.main.ctrl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.main.entites.ActivityLog;
import com.java.main.repository.ActivityLogRepository;
import com.java.main.services.ActivityLogService;
import com.java.main.services.payload.ActivityLogDto;

@RestController
@RequestMapping("/api/v1/admin")
public class ActivityController {

	@Autowired
    private ActivityLogService activityLogService;

	@Autowired
	private ActivityLogRepository activityLogRepo;
	
	@Autowired
	private ModelMapper modelMapper;

    ActivityController(ActivityLogService activityLogService) {
        this.activityLogService = activityLogService;
    }
	
	@GetMapping("/activities")
	public ResponseEntity<List<ActivityLogDto>> getLogs(){
		List<ActivityLog> activities = this.activityLogRepo.findTop10ByOrderByTimestampDesc();
		
		return new ResponseEntity<List<ActivityLogDto>>(
				activities.stream().map(log -> this.modelMapper.map(log, ActivityLogDto.class)).collect(Collectors.toList())
				, HttpStatus.OK);
	}
	
	@PostMapping("/log")
	public ResponseEntity<Void> receiveLog(@RequestBody ActivityLogDto activityLogDto){
		this.activityLogService.log(activityLogDto.getMessage(), activityLogDto.getActionType());
		return new ResponseEntity<Void>(HttpStatus.CREATED);
	}
}
