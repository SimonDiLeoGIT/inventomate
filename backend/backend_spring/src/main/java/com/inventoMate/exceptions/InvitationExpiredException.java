package com.inventoMate.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ResponseStatus(HttpStatus.FORBIDDEN)
public class InvitationExpiredException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	private LocalDateTime expirationDateTime;
	
    public InvitationExpiredException(LocalDateTime expirationDateTime) {
        super(String.format("La invitación ha expirado : fecha expiracion: %s", expirationDateTime.toString()));
        this.expirationDateTime = expirationDateTime;
    }

}
