package com.inventoMate.configuration.meli;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Setter
@Getter
@ConfigurationProperties(prefix = "meli.url")
public class MeliUrlsProperties {

	private String predictCategory;
	private String refreshToken;
	private String trends;
	private String highlightTop;
	private String product;
	private String productAdditionalInfo;

}