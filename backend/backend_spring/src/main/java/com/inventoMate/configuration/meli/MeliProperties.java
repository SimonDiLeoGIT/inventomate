package com.inventoMate.configuration.meli;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Setter
@Getter
@ConfigurationProperties(prefix = "meli")
public class MeliProperties {

	private String appId;
	private String clientSecret;
	private String accessToken;
	private String refreshToken;
	private String codeLogin;
	private String redirectUri;

}