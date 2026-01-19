package com.java.main.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.main.entites.ActivityLog;
import com.java.main.repository.ActivityLogRepository;

@Service
public class ActivityLogService {

	@Autowired
	private ActivityLogRepository activityLogRepo;
	
	public void log(String message, String type) {
		ActivityLog log = new ActivityLog();
		log.setMessage(message);
		log.setActionType(type);
		log.setTimestamp(LocalDateTime.now());
		
		this.activityLogRepo.save(log);
	}
}
