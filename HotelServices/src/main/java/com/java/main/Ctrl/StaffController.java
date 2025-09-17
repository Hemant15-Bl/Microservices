package com.java.main.Ctrl;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StaffController {
	
	@GetMapping("/staffs")
	public ResponseEntity<List<String>> getstaffs(){
		List<String> list = Arrays.asList("Rohit","Kishore","Naveen","Priya","Riya");
		return ResponseEntity.ok(list);
	}
}
