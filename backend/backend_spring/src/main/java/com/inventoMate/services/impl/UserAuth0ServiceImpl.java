package com.inventoMate.services.impl;

import org.springframework.stereotype.Service;

import com.auth0.client.auth.AuthAPI;
import com.auth0.client.mgmt.ManagementAPI;
import com.auth0.exception.Auth0Exception;
import com.auth0.json.mgmt.tickets.PasswordChangeTicket;
import com.auth0.json.mgmt.users.User;
import com.inventoMate.configuration.ApplicationProperties;
import com.inventoMate.dtos.users.EditUserRequest;
import com.inventoMate.services.RoleAuth0Service;
import com.inventoMate.services.UserAuth0Service;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserAuth0ServiceImpl implements UserAuth0Service {

	private final ManagementAPI managementAPI;
	private final RoleAuth0Service roleAuth0ServiceImpl;
	private final AuthAPI authApi;
	private final ApplicationProperties appProperties;

	@Override
	public User createUserWithRole(String email, String roleId, String password) throws Auth0Exception {
		User user = new User();
		user.setEmail(email);
		user.setPassword(password.toCharArray());
		user.setConnection(appProperties.getDatabaseConnection());
		user = managementAPI.users().create(user).addHeader("Content-Type", "application/json").execute().getBody();
		roleAuth0ServiceImpl.assignRolToUser(roleId, user.getId());
		return user;
	}

	@Override
	public User getUserById(String subject) throws Auth0Exception {
		return managementAPI.users().get(subject, null).execute().getBody();
	}

	@Override
	public void updateUser(String id, @Valid EditUserRequest usuarioEditRequest) throws Auth0Exception {
		User user = new User();
		if (usuarioEditRequest.getEmail() != null)
			user.setEmail(usuarioEditRequest.getEmail());
		user.setNickname(usuarioEditRequest.getNickname());
		user.setPicture(usuarioEditRequest.getPicture());
		managementAPI.users().update(id, user).addHeader("Content-Type", "application/json")
				.addHeader("Accept", "application/json").execute();
	}

	@Override
	public Object editPasswordRequest(String id) throws Auth0Exception {
		return managementAPI.tickets().requestPasswordChange(new PasswordChangeTicket(id)).execute().getBody();
	}

	@Override
	public void deleteUserByAuth0Id(String id, String token) throws Auth0Exception {
		managementAPI.deviceCredentials().delete(id);
		authApi.revokeToken(token).execute();
		managementAPI.users().delete(id).execute();
	}

}
