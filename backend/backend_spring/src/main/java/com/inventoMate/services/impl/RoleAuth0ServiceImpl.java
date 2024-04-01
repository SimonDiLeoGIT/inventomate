package com.inventoMate.services.impl;


import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.auth0.client.mgmt.ManagementAPI;
import com.auth0.exception.Auth0Exception;
import com.auth0.json.mgmt.permissions.Permission;
import com.auth0.json.mgmt.roles.Role;
import com.inventoMate.dtos.roles.PermissionDTO;
import com.inventoMate.dtos.roles.RoleDTO;
import com.inventoMate.dtos.roles.RolePermissionsDTO;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class RoleAuth0ServiceImpl {
	
	private final ManagementAPI managementAPI;
	private final ModelMapper modelMapper;
	
	
	public List<RoleDTO> getAllRoles() throws Auth0Exception {
		List<Role> roles = managementAPI.roles().list(null).execute().getBody().getItems();
		List<RoleDTO> rolesDTO = roles.stream()
			    .map(role -> modelMapper.map(role, RoleDTO.class))
			    .collect(Collectors.toList());
		
		return rolesDTO;
	}


	public RoleDTO getRolById(String roleId) throws Auth0Exception {
		Role role = managementAPI.roles()
				.get(roleId)
				.execute().getBody();
				
		return modelMapper.map(role, RoleDTO.class);
	}


	public RolePermissionsDTO getPermissionsRole(String roleId) throws Auth0Exception {		
		Role role = managementAPI.roles().get(roleId).execute().getBody();
		List<Permission> permissions = managementAPI.roles()
				.listPermissions(roleId, null)
				.execute().getBody()
				.getItems();
		return RolePermissionsDTO.builder()
				.rol(modelMapper.map(role, RoleDTO.class))
				.permissions(permissions
						.stream()
						.map(permission -> modelMapper.map(permission, PermissionDTO.class))
						.collect(Collectors.toList()))
				.build();
	}
	
	public Object assignRolToUser(String roleId, String userId) throws Auth0Exception {
		List<String> users = new LinkedList<String>();
		users.add(userId);
		return managementAPI.roles()
				.assignUsers(roleId,users)
				.execute().getBody();
	}


	public Object getUsers() throws Auth0Exception {
		return managementAPI.users().list(null).execute().getBody();
	}
	
}
