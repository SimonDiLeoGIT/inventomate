package com.inventoMate.configuration.auth0;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.auth0.client.auth.AuthAPI;
import com.auth0.client.mgmt.ManagementAPI;
import com.auth0.exception.Auth0Exception;
import com.auth0.json.auth.TokenHolder;
import com.auth0.net.TokenRequest;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Configuration
public class ManagementConfig {

	private final Auth0Properties authProperties;
	private final AuthAPI authAPI;

	@Bean
	ManagementAPI managementAPI() throws Auth0Exception {
		TokenRequest tokenRequest = authAPI.requestToken("https://" + authProperties.getDomain() + "/api/v2/");
		TokenHolder holder = tokenRequest.execute().getBody();
		String accessToken = holder.getAccessToken();
		return ManagementAPI.newBuilder(authProperties.getDomain(), accessToken).build();
	}
}
