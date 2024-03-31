package com.inventoMate.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "application")
public class ApplicationProperties {

	private String clientOriginUrl;

	public String getClientOriginUrl() {
		return clientOriginUrl;
	}

	public void setClientOriginUrl(String clientOriginUrl) {
		this.clientOriginUrl = clientOriginUrl;
	}
}
