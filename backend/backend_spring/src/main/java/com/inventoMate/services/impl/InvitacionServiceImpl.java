package com.inventoMate.services.impl;

import org.springframework.stereotype.Service;

import com.inventoMate.entities.InvitacionSucursal;
import com.inventoMate.exceptions.InvitationExpiredException;
import com.inventoMate.exceptions.ResourceNotFoundException;
import com.inventoMate.repositories.InvitacionRepository;
import com.inventoMate.services.InvitacionService;

import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class InvitacionServiceImpl implements InvitacionService {

	private final InvitacionRepository invitacionRepository;
	private final int EXPIRATION_TIME = 24;

	@Override
	public String saveInvitacion(Long idUsuario, Long idSucursal, List<Long> idsRoles) {
		String token = UUID.randomUUID().toString();
		InvitacionSucursal invitacion = new InvitacionSucursal();
		invitacion.setToken(token);
		invitacion.setFechaCreacion(LocalDateTime.now());
		invitacion.setFechaExpiracion(LocalDateTime.now().plusHours(EXPIRATION_TIME));
		invitacion.setIdSucursal(idSucursal);
		invitacion.setIdUsuarioInvitado(idUsuario);
		invitacion.setRoles(idsRoles);
		invitacionRepository.save(invitacion);
		return token;
	}

	@Override
	public InvitacionSucursal getInvitacionByToken(String token) {
		InvitacionSucursal invitacion = invitacionRepository.findByToken(token)
				.orElseThrow(() -> new ResourceNotFoundException("Invitacion", "token", token));
		if (invitacion.getFechaExpiracion().isBefore(LocalDateTime.now())) {
			throw new InvitationExpiredException(invitacion.getFechaExpiracion());
		}
		invitacionRepository.delete(invitacion);
		return invitacion;
	}
}
