package com.inventoMate.services;


import java.util.List;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.dtos.roles.RolDTO;
import com.inventoMate.dtos.users.EditUserRequest;
import com.inventoMate.dtos.users.UsuarioDTO;
import com.inventoMate.dtos.users.UsuarioProfileResponse;

import jakarta.validation.Valid;

public interface UsuarioService {

	UsuarioDTO createUsuario(String idAuth0) throws Auth0Exception;

	UsuarioProfileResponse getProfileCurrentUser(String idAuth0) throws Auth0Exception;

	UsuarioProfileResponse updateUser(String idAuth0,  @Valid EditUserRequest usuario) throws Auth0Exception;

	void deleteUserPrincipal(String idAuth0);

	List<RolDTO> getUserRoles(String idAuth0, Long idSucursal, Long idUser);
}
