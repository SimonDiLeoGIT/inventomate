package com.inventoMate.payload;

import lombok.Value;

@Value
public class ErrorMessage {

	
	private int statusCode;
	private String message;

	public static ErrorMessage from(final String message, final int statusCode) {
		return new ErrorMessage(statusCode,message);
	}
}
