package com.inventoMate.services;


import com.auth0.exception.Auth0Exception;
import com.inventoMate.dtos.users.UsuarioDTO;

public interface UsuarioService {

	UsuarioDTO createUsuario(String id) throws Auth0Exception;

	UsuarioDTO getUserByIdAuth0(String idAuth0) throws Auth0Exception;

}
