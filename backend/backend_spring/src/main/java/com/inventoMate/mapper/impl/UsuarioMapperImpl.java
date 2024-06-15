package com.inventoMate.mapper.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.auth0.json.mgmt.users.User;
import com.inventoMate.dtos.roles.RolDTO;
import com.inventoMate.dtos.users.EditUserRequest;
import com.inventoMate.dtos.users.UsuarioDTO;
import com.inventoMate.dtos.users.UsuarioProfileResponse;
import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Rol;
import com.inventoMate.entities.Sucursal;
import com.inventoMate.entities.Usuario;
import com.inventoMate.mapper.EmpresaMapper;
import com.inventoMate.mapper.RolMapper;
import com.inventoMate.mapper.SucursalMapper;
import com.inventoMate.mapper.UsuarioMapper;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class UsuarioMapperImpl implements UsuarioMapper {

	private final ModelMapper mapper;
	private final EmpresaMapper empresaMapper;
	private final SucursalMapper sucursalMapper;
	private final RolMapper rolMapper;

	@Override
	public UsuarioDTO mapToUsuarioDTO(Usuario usuario) {
		return usuario != null ? mapper.map(usuario, UsuarioDTO.class) : null;
	}

	@Override
	public UsuarioProfileResponse mapToUsuarioProfileResponse(Empresa empresa, Sucursal sucursal, Usuario usuario) {
		return UsuarioProfileResponse.builder().empresa(empresaMapper.mapToEmpresaDTO(empresa))
				.sucursal(sucursalMapper.mapToSucursalDTO(sucursal)).usuario(mapToUsuarioDTO(usuario))
				.roles(rolMapper.mapToRolDTO(usuario.getRoles())).build();
	}

	@Override
	public List<UsuarioDTO> mapToUsuarioDTO(List<Usuario> usuarios) {
		return usuarios.stream().map(usuario -> mapToUsuarioDTO(usuario)).collect(Collectors.toList());
	}

	@Override
	public Usuario mapAuth0UserToUsuario(User userAuth0) {
		Usuario usuario = new Usuario();
		usuario.setEmail(userAuth0.getEmail());
		usuario.setIdAuth0(userAuth0.getId());
		usuario.setNickname(userAuth0.getNickname());
		usuario.setPicture(userAuth0.getPicture());
		return usuario;
	}

	@Override
	public List<RolDTO> mapUsuarioRolesToRolesDTO(List<Rol> roles) {
		return rolMapper.mapToRolDTO(roles);
	}

	@Override
	public void mapEditRequestToUsuario(Usuario usuario, @Valid EditUserRequest usuarioEditRequest) {
		if (usuarioEditRequest.getEmail() != null)
			usuario.setEmail(usuarioEditRequest.getEmail());
		usuario.setNickname(usuarioEditRequest.getNickname());
		usuario.setPicture(usuarioEditRequest.getPicture());
	}

}
