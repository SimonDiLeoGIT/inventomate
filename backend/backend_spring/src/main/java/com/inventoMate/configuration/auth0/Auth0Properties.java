package com.inventoMate.configuration.auth0;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Getter
@Setter
@ConfigurationProperties(prefix = "auth0")
public class Auth0Properties {

	private String domain;
	private String clientId;
	private String clientSecret;

}
