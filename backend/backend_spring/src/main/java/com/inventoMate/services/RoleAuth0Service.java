package com.inventoMate.services;

import java.util.List;

import org.springframework.http.HttpStatus;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.dtos.roles.RoleDTO;
import com.inventoMate.dtos.roles.RolePermissionsDTO;
import com.inventoMate.entities.Rol;
import com.inventoMate.entities.Usuario;

public interface RoleAuth0Service {

	List<RoleDTO> getAllRoles() throws Auth0Exception;

	RoleDTO getRolById(String roleId) throws Auth0Exception;

	RolePermissionsDTO getPermissionsRole(String roleId) throws Auth0Exception;

	HttpStatus assignRolToUser(String roleId, String userId) throws Auth0Exception;

	void unAssignRolesToUser(String idAuth0, List<Rol> roles);

	void revokeUsersAuth0Roles(List<Usuario> empleados);

	void assignRolesToUser(String idAuth0, List<Rol> rolesNuevos);

}