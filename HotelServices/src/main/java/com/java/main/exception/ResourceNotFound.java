package com.java.main.exception;

public class ResourceNotFound extends RuntimeException{

	public ResourceNotFound() {
		super("Id Not Found!!");
	}

	public ResourceNotFound(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}
	
}
