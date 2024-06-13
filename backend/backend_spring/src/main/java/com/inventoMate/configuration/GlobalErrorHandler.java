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
import com.inventoMate.services.ErrorService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;

@RestControllerAdvice
@AllArgsConstructor
public class GlobalErrorHandler {

	private final ErrorService errorService;

	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(NoHandlerFoundException.class)
	public ErrorMessage handleNotFound(final HttpServletRequest request, final Exception error) {
		registrarError(NoHandlerFoundException.class.getSimpleName(), HttpStatus.NOT_FOUND.value(), error.getMessage());
		return ErrorMessage.from("Not Found", HttpStatus.NOT_FOUND.value());
	}

	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ExceptionHandler(AccessDeniedException.class)
	public ErrorMessage handleAccessDenied(final HttpServletRequest request, final Exception error) {
		registrarError(AccessDeniedException.class.getSimpleName(), HttpStatus.FORBIDDEN.value(), error.getMessage());
		return ErrorMessage.from("Permission denied", HttpStatus.FORBIDDEN.value());
	}

	@ResponseStatus(HttpStatus.CONFLICT)
	@ExceptionHandler(ResourceAlreadyExistsException.class)
	public ErrorMessage handleResourceAlreadyExists(final HttpServletRequest request, final Exception error) {
		registrarError(ResourceAlreadyExistsException.class.getSimpleName(), HttpStatus.CONFLICT.value(), error.getMessage());
		return ErrorMessage.from(error.getMessage(), HttpStatus.CONFLICT.value());
	}

	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(ResourceNotFoundException.class)
	public ErrorMessage handleResourceNotFound(final HttpServletRequest request, final Exception error) {
		registrarError(ResourceNotFoundException.class.getSimpleName(), HttpStatus.NOT_FOUND.value(), error.getMessage());
		return ErrorMessage.from(error.getMessage(), HttpStatus.NOT_FOUND.value());
	}

	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(Throwable.class)
	public ErrorMessage handleInternalError(final HttpServletRequest request, final Exception error) {
		registrarError(HttpStatus.INTERNAL_SERVER_ERROR.name(), HttpStatus.INTERNAL_SERVER_ERROR.value(), error.getMessage());
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
		registrarError(MethodArgumentNotValidException.class.getSimpleName(), HttpStatus.BAD_REQUEST.value(), ex.getMessage());
		return ErrorMessage.from(errorMessage.toString(), HttpStatus.BAD_REQUEST.value());
	}

	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ExceptionHandler(InvitationExpiredException.class)
	public ErrorMessage handleInvitacionExpired(final HttpServletRequest request, final Exception error) {
		registrarError(InvitationExpiredException.class.getSimpleName(), HttpStatus.FORBIDDEN.value(), error.getMessage());
		return ErrorMessage.from(error.getMessage(), HttpStatus.FORBIDDEN.value());
	}

	@ExceptionHandler(ClientAbortException.class)
	public ErrorMessage handleClientAbortException(final HttpServletRequest request, final Exception error) {
		registrarError(ClientAbortException.class.getSimpleName(), HttpStatus.INTERNAL_SERVER_ERROR.value(), error.getMessage());
		return ErrorMessage.from(error.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
	}

	@ExceptionHandler(IOException.class)
	public ErrorMessage handleIOException(final HttpServletRequest request, final Exception error) {
		registrarError(IOException.class.getSimpleName(), HttpStatus.INTERNAL_SERVER_ERROR.value(), error.getMessage());
		return ErrorMessage.from(error.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
	}

	private void registrarError(String titulo, int codigo, String detalle) {
		errorService.crearError(titulo, codigo, detalle);
	}
}
