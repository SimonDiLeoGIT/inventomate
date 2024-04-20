package com.inventoMate.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;
import com.auth0.exception.Auth0Exception;
import com.auth0.json.mgmt.users.User;
import com.inventoMate.dtos.users.UsuarioDTO;
import com.inventoMate.entities.Usuario;
import com.inventoMate.exceptions.ResourceAlreadyExistsException;
import com.inventoMate.exceptions.ResourceNotFoundException;
import com.inventoMate.repositories.UsuarioRepository;
import com.inventoMate.services.UserAuth0Service;
import com.inventoMate.services.UsuarioService;

import lombok.AllArgsConstructor;

@AllArgsConstructor(onConstructor = @__(@Autowired))
@Service
public class UsuarioServiceImpl implements UsuarioService {

	private final UsuarioRepository usuarioRepository;
	private final UserAuth0Service userAuthService;
	private final ModelMapper modelMapper;
	
	public UsuarioDTO createUsuario(String idAuth0) throws Auth0Exception {
		
		// obtengo el usuario de auth0 por su Id
		User userAuth0 = userAuthService.getUserById(idAuth0);
		
		// valido que no exista un usuario ya creado
		if(usuarioRepository.existsByIdAuth0(idAuth0)) {
			throw new ResourceAlreadyExistsException("Usuario","Id_Auth0", idAuth0);
		}
		
		// creo el usuario con los atributos requeridos
		Usuario usuario = new Usuario();
		
		usuario.setEmail(userAuth0.getEmail());
		usuario.setIdAuth0(userAuth0.getId());
		usuario.setNickname(userAuth0.getNickname());
		
		// lo guardo en la bd
		usuarioRepository.save(usuario);
		
		// mapeo el usuario en su DTO
		return modelMapper.map(usuario, UsuarioDTO.class);
	}

	@Override
	public UsuarioDTO getUserByIdAuth0(String idAuth0) throws Auth0Exception {
		
		Usuario usuario  = usuarioRepository.findByIdAuth0(idAuth0).orElseThrow(()-> 
			new ResourceNotFoundException("Usuario", "id_auth0", idAuth0)
		);
		
		return modelMapper.map(usuario, UsuarioDTO.class);
	}
}
