package com.inventoMate.services;

import java.util.List;

import org.springframework.http.HttpStatus;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.dtos.roles.RoleDTO;
import com.inventoMate.dtos.roles.RolePermissionsDTO;

public interface RoleAuth0Service {

	List<RoleDTO> getAllRoles() throws Auth0Exception;

	RoleDTO getRolById(String roleId) throws Auth0Exception;

	RolePermissionsDTO getPermissionsRole(String roleId) throws Auth0Exception;

	HttpStatus assignRolToUser(String roleId, String userId) throws Auth0Exception;

}