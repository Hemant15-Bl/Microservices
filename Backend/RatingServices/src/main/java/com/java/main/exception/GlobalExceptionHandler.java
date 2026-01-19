package com.java.main.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.java.main.payload.APIResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<APIResponse> exceptionResponse(ResourceNotFoundException ex){
		String message = ex.getMessage();
		APIResponse apiResponse = APIResponse.builder().message(message).success(true).status(HttpStatus.NO_CONTENT).build();
		return new ResponseEntity<APIResponse>(apiResponse, HttpStatus.NO_CONTENT);
	}
}
