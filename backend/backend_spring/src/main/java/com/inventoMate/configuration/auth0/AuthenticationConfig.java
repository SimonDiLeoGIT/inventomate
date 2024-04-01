package com.inventoMate.configuration.auth0;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.auth0.client.auth.AuthAPI;

import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class AuthenticationConfig {

	private Auth0Properties authProperties;

	@Bean
	AuthAPI authAPI() {
		return AuthAPI
				.newBuilder(authProperties.getDomain(), authProperties.getClientId(), authProperties.getClientSecret())
				.build();
	}
}
