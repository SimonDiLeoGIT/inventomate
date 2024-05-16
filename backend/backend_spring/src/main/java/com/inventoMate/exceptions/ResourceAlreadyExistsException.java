package com.inventoMate.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ResponseStatus(HttpStatus.CONFLICT)
public class ResourceAlreadyExistsException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	private final String resourceName;
	private final String fieldName;
	private final String fieldValue;

	public ResourceAlreadyExistsException(String resourceName, String fieldName, String fieldValue) {
		super(String.format("%s with %s: '%s' already exists", resourceName, fieldName, fieldValue));
		this.resourceName = resourceName;
		this.fieldName = fieldName;
		this.fieldValue = fieldValue;
	}
}
