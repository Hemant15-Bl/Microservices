package com.java.main.services.exception;

public class ApiException extends RuntimeException{

	public ApiException() {
		super("Invailed username");
		
	}

	public ApiException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	
}
