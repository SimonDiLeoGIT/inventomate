package com.inventoMate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import com.auth0.exception.Auth0Exception;
import com.auth0.json.mgmt.users.User;
import com.inventoMate.dtos.users.UsuarioDTO;
import com.inventoMate.entities.Usuario;
import com.inventoMate.exceptions.ResourceAlreadyExistsException;
import com.inventoMate.repositories.UsuarioRepository;
import com.inventoMate.services.UserAuth0Service;
import com.inventoMate.services.impl.UsuarioServiceImpl;

@ExtendWith(MockitoExtension.class)
public class TestUsuarioService {

	@Mock
	private UsuarioRepository usuarioRepositoryMock;

	@Mock
	private UserAuth0Service userAuthServiceMock;

	@Mock
	private ModelMapper modelMapperMock;

	@InjectMocks
	private UsuarioServiceImpl usuarioService;

	@Test
	public void testCreateUsuario() throws Auth0Exception {
		// Datos de prueba
		String idAuth0 = "idAuth0";

		// Crear un objeto User falso
		User userAuth0 = new User();
		userAuth0.setEmail("test@example.com");
		userAuth0.setNickname("test_user");

		// Configurar el mock para que devuelva el usuario falso
		when(userAuthServiceMock.getUserById(eq(idAuth0))).thenReturn(userAuth0);

		// Comportamiento esperado del mock de UsuarioRepository
		when(usuarioRepositoryMock.existsByIdAuth0(eq(idAuth0))).thenReturn(false);

		// Configurar el comportamiento esperado del mock de ModelMapper
		UsuarioDTO usuarioDTOMock = new UsuarioDTO();
		usuarioDTOMock.setEmail("test@example.com");
		usuarioDTOMock.setNickname("test_user");
		when(modelMapperMock.map(any(Usuario.class), eq(UsuarioDTO.class))).thenReturn(usuarioDTOMock);

		// Ejecución del método bajo prueba
		UsuarioDTO usuarioCreado = usuarioService.createUsuario(idAuth0);

		// Verificación
		Assertions.assertNotNull(usuarioCreado);
		Assertions.assertEquals("test@example.com", usuarioCreado.getEmail());
		Assertions.assertEquals("test_user", usuarioCreado.getNickname());
	}

	@Test
	public void testCreateUsuario_ResourceAlreadyExistsException() throws Auth0Exception {
		// Datos de prueba
		String idAuth0 = "idAuth0";

		// Comportamiento esperado del mock de UsuarioRepository
		when(usuarioRepositoryMock.existsByIdAuth0(idAuth0)).thenReturn(true);

		// Verificación de la excepción esperada
		Assertions.assertThrows(ResourceAlreadyExistsException.class, () -> {
			usuarioService.createUsuario(idAuth0);
		});
	}
}