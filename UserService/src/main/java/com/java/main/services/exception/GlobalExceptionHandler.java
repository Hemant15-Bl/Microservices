package com.java.main.services.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.java.main.services.payload.ResponseApi;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ResponseApi> handlerResourceNotFound(ResourceNotFoundException ex){
		String msg = ex.getMessage();
		ResponseApi res = ResponseApi.builder().message(msg).success(true).status(HttpStatus.NOT_FOUND).build();
		return new ResponseEntity<ResponseApi>(res,HttpStatus.NOT_FOUND);
	}
}
