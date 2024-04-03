package com.inventoMate.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Getter
@Setter
@ConfigurationProperties(prefix = "application")
public class ApplicationProperties {

	private String clientOriginUrl;
	private String databaseConnection;
}
