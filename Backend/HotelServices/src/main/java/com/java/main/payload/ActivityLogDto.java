package com.java.main.payload;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ActivityLogDto {

	private Long activityId;
	private String message;
	private String actionType;
	private LocalDateTime timestamp;
}
