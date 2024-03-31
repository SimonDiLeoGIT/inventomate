package com.inventoMate.configuration.auth0;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "okta.oauth2")
public class OktaOauth2Properties {

	private String clientOriginUrl;
	private String issuer;
	private String audience;

	public String getClientOriginUrl() {
		return clientOriginUrl;
	}

	public void setClientOriginUrl(String clientOriginUrl) {
		this.clientOriginUrl = clientOriginUrl;
	}

	public String getIssuer() {
		return issuer;
	}

	public void setIssuer(String issuer) {
		this.issuer = issuer;
	}

	public String getAudience() {
		return audience;
	}

	public void setAudience(String audience) {
		this.audience = audience;
	}
}
