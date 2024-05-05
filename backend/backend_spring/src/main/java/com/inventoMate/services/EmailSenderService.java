package com.inventoMate.services;

import java.util.List;

import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Rol;
import com.inventoMate.entities.Sucursal;
import com.inventoMate.entities.Usuario;

public interface EmailSenderService {

	void enviarCorreo(String destinatario);

	void sendSucursalInvitation(Empresa empresa, Sucursal sucursal, Usuario usuario, List<Rol> rol, String token);
	
}
