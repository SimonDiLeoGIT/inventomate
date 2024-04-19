package com.inventoMate;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.*;
import com.inventoMate.dtos.users.UsuarioDTO;
import com.inventoMate.repositories.UsuarioRepository;
import com.inventoMate.services.UsuarioService;
import com.inventoMate.services.impl.UsuarioServiceImpl;

@ExtendWith(MockitoExtension.class)
public class testRegisterUser {
	@Mock
	private UsuarioServiceImpl usuarioServicioImpl;
	
	@InjectMocks
	private UsuarioService usuarioServicio;
	
	@Test
	public void test1() {
		UsuarioDTO esperado = new UsuarioDTO(1L,"idauth0","prueba",null,null,null);
		Mockito.when(usuarioServicioImpl.createUsuario("idauth0"))
				.thenReturn(esperado);
		final UsuarioDTO resultado =
				usuarioServicio.createUsuario("idauth0");
		Assertions.assertEquals(esperado, resultado);
	}
}
