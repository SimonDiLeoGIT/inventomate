package com.inventoMate.services;


import com.auth0.exception.Auth0Exception;
import com.inventoMate.dtos.users.UsuarioDTO;
import com.inventoMate.payload.EditUserRequest;

import jakarta.validation.Valid;

public interface UsuarioService {

	UsuarioDTO createUsuario(String idAuth0) throws Auth0Exception;

	UsuarioDTO getProfileCurrentUser(String idAuth0) throws Auth0Exception;

	UsuarioDTO updateUser(String idAuth0,  @Valid EditUserRequest usuario) throws Auth0Exception;

	void deleteUserPrincipal(String idAuth0);
}
