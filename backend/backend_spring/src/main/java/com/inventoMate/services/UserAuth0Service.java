package com.inventoMate.services;

import com.auth0.exception.Auth0Exception;
import com.auth0.json.mgmt.users.User;
import com.inventoMate.dtos.users.EditUserRequest;

import jakarta.validation.Valid;

public interface UserAuth0Service {

	User createUserWithRole(String email, String roleId, String password) throws Auth0Exception;

	User getUserById(String subject) throws Auth0Exception;

	void updateUser(String id, @Valid EditUserRequest usuarioEditRequest) throws Auth0Exception;

	Object editPasswordRequest(String id) throws Auth0Exception;

	void deleteUserByAuth0Id(String id, String token) throws Auth0Exception;

}
