package com.inventoMate.services;

import com.auth0.exception.Auth0Exception;

public interface UserAuth0Service {

	Object createUserWithRole(String email, String roleId, String password) throws Auth0Exception;

}
