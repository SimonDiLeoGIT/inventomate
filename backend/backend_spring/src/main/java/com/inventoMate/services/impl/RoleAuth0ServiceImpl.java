package com.inventoMate.services.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.auth0.client.mgmt.ManagementAPI;
import com.auth0.exception.Auth0Exception;
import com.auth0.json.mgmt.permissions.Permission;
import com.auth0.json.mgmt.roles.Role;
import com.inventoMate.dtos.roles.PermissionDTO;
import com.inventoMate.dtos.roles.RoleDTO;
import com.inventoMate.dtos.roles.RolePermissionsDTO;
import com.inventoMate.entities.Rol;
import com.inventoMate.entities.Usuario;
import com.inventoMate.services.RoleAuth0Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RoleAuth0ServiceImpl implements RoleAuth0Service {

	private final ManagementAPI managementAPI;
	private final ModelMapper modelMapper;

	@Override
	public List<RoleDTO> getAllRoles() throws Auth0Exception {
		List<Role> roles = managementAPI.roles().list(null).execute().getBody().getItems();
		List<RoleDTO> rolesDTO = roles.stream().map(role -> modelMapper.map(role, RoleDTO.class))
				.collect(Collectors.toList());

		return rolesDTO;
	}

	@Override
	public RoleDTO getRolById(String roleId) throws Auth0Exception {
		Role role = managementAPI.roles().get(roleId).execute().getBody();

		return modelMapper.map(role, RoleDTO.class);
	}

	@Override
	public RolePermissionsDTO getPermissionsRole(String roleId) throws Auth0Exception {
		Role role = managementAPI.roles().get(roleId).execute().getBody();
		List<Permission> permissions = managementAPI.roles().listPermissions(roleId, null).execute().getBody()
				.getItems();
		return RolePermissionsDTO.builder().rol(modelMapper.map(role, RoleDTO.class)).permissions(permissions.stream()
				.map(permission -> modelMapper.map(permission, PermissionDTO.class)).collect(Collectors.toList()))
				.build();
	}

	@Override
	public HttpStatus assignRolToUser(String roleId, String userId) throws Auth0Exception {
		List<String> users = new LinkedList<String>();
		users.add(userId);
		return HttpStatus.valueOf(managementAPI.roles().assignUsers(roleId, users).execute().getStatusCode());
	}

	@Override
	public void unAssignRolesToUser(String idAuth0, List<Rol> roles) {
		var rolesIdAuth0 = roles.stream().map(role -> role.getIdRolAuth0()).collect(Collectors.toList());
		try {
			managementAPI.users().removeRoles(idAuth0, rolesIdAuth0).execute();
		} catch (Auth0Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void revokeUsersAuth0Roles(List<Usuario> empleados) {
		empleados.forEach(empleado -> {
			var roles = empleado.getRoles();
			if (roles != null) {
				unAssignRolesToUser(empleado.getIdAuth0(), empleado.getRoles());
			}
		});
	}

	@Override
	public void assignRolesToUser(String idAuth0, List<Rol> rolesNuevos) {
		rolesNuevos.forEach(rol -> {
			try {
				assignRolToUser(rol.getIdRolAuth0(), idAuth0);
			} catch (Auth0Exception e) {
				e.printStackTrace();
			}
		});
	}
}
