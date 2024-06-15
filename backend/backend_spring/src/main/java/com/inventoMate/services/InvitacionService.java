package com.inventoMate.services;

import java.util.List;

import com.inventoMate.entities.InvitacionSucursal;

public interface InvitacionService {

	String saveInvitacion(Long idUsuario, Long idSucursal, List<Long> idsRoles);

	InvitacionSucursal getInvitacionByToken(String token);

}