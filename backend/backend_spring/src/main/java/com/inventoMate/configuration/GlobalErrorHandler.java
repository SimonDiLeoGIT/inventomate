package com.inventoMate.configuration;

import java.io.IOException;

import org.apache.catalina.connector.ClientAbortException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.inventoMate.exceptions.InvitationExpiredException;
import com.inventoMate.exceptions.ResourceAlreadyExistsException;
import com.inventoMate.exceptions.ResourceNotFoundException;
import com.inventoMate.payload.ErrorMessage;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalErrorHandler {

	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(NoHandlerFoundException.class)
	public ErrorMessage handleNotFound(final HttpServletRequest request, final Exception error) {
		return ErrorMessage.from("Not Found", HttpStatus.NOT_FOUND.value());
	}

	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ExceptionHandler(AccessDeniedException.class)
	public ErrorMessage handleAccessDenied(final HttpServletRequest request, final Exception error) {
		return ErrorMessage.from("Permission denied", HttpStatus.FORBIDDEN.value());
	}

	@ResponseStatus(HttpStatus.CONFLICT)
	@ExceptionHandler(ResourceAlreadyExistsException.class)
	public ErrorMessage handleResourceAlreadyExists(final HttpServletRequest request, final Exception error) {
		return ErrorMessage.from(error.getMessage(), HttpStatus.CONFLICT.value());
	}

	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(ResourceNotFoundException.class)
	public ErrorMessage handleResourceNotFound(final HttpServletRequest request, final Exception error) {
		return ErrorMessage.from(error.getMessage(), HttpStatus.NOT_FOUND.value());
	}

	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(Throwable.class)
	public ErrorMessage handleInternalError(final HttpServletRequest request, final Exception error) {
		return ErrorMessage.from(error.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ErrorMessage handleValidationExceptions(MethodArgumentNotValidException ex) {
		StringBuilder errorMessage = new StringBuilder("Error de validación: ");
		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessageText = error.getDefaultMessage();
			errorMessage.append(fieldName).append(" ").append(errorMessageText).append("; ");
		});
		return ErrorMessage.from(errorMessage.toString(), HttpStatus.BAD_REQUEST.value());
	}

	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ExceptionHandler(InvitationExpiredException.class)
	public ErrorMessage handleInvitacionExpired(final HttpServletRequest request, final Exception error) {
		return ErrorMessage.from(error.getMessage(), HttpStatus.FORBIDDEN.value());
	}
	
	@ExceptionHandler(ClientAbortException.class)
	public ErrorMessage handleClientAbortException(final HttpServletRequest request, final Exception error) {
		return ErrorMessage.from(error.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
	}
	
	@ExceptionHandler(IOException.class)
	public ErrorMessage handleIOException(final HttpServletRequest request, final Exception error) {
		return ErrorMessage.from(error.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
	}
}
