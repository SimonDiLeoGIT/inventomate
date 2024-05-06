package com.inventoMate.configuration.email;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Setter
@Getter
@ConfigurationProperties(prefix = "email")
public class EmailProperties {

	private String username;
	private String password;
	
}
