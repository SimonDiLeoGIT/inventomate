package com.inventoMate.mapper;

import java.util.List;

import com.auth0.json.mgmt.users.User;
import com.inventoMate.dtos.roles.RolDTO;
import com.inventoMate.dtos.users.EditUserRequest;
import com.inventoMate.dtos.users.UsuarioDTO;
import com.inventoMate.dtos.users.UsuarioProfileResponse;
import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Rol;
import com.inventoMate.entities.Sucursal;
import com.inventoMate.entities.Usuario;

import jakarta.validation.Valid;

public interface UsuarioMapper {

	UsuarioDTO mapToUsuarioDTO(Usuario usuario);

	UsuarioProfileResponse mapToUsuarioProfileResponse(Empresa empresa, Sucursal sucursal, Usuario usuario);

	List<UsuarioDTO> mapToUsuarioDTO(List<Usuario> usuarios);

	Usuario mapAuth0UserToUsuario(User userAuth0);

	List<RolDTO> mapUsuarioRolesToRolesDTO(List<Rol> roles);

	void mapEditRequestToUsuario(Usuario usuario, @Valid EditUserRequest usuarioEditRequest);
}
