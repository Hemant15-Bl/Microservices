package com.java.main.externalService;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.java.main.payload.ActivityLogDto;


@FeignClient(name = "USER-SERVICE", path = "/api/v1/admin")
public interface ActivityLog {

	@PostMapping("/log")
	public void sendActivityLog(@RequestBody ActivityLogDto activityLogDto);
}
