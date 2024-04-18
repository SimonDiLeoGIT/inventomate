package com.inventoMate.services;

import com.auth0.exception.Auth0Exception;
import com.auth0.json.mgmt.users.User;

public interface UserAuth0Service {

	Object createUserWithRole(String email, String roleId, String password) throws Auth0Exception;

	User getUserById(String subject) throws Auth0Exception;

}
