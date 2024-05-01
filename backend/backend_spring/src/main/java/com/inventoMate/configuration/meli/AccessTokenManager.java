package com.inventoMate.configuration.meli;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class AccessTokenManager {

	private final MeliProperties meliProperties;

	private final RestTemplate restTemplate;

	private final MeliUrlsProperties meliUrlsProperties;

	private void renewAccessToken() {

		MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
		requestBody.add("grant_type", "refresh_token");
		requestBody.add("client_id", meliProperties.getAppId());
		requestBody.add("client_secret", meliProperties.getClientSecret());
		requestBody.add("refresh_token", meliProperties.getRefreshToken());

		UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(meliUrlsProperties.getRefreshToken());

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
		headers.set("accept", "application/json");
		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

		ResponseEntity<String> response = restTemplate.exchange(builder.toUriString(), HttpMethod.POST, requestEntity,
				String.class);

		if (response.getStatusCode() == HttpStatus.OK) {
			String responseBody = response.getBody();
			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode jsonNode;
			try {
				jsonNode = objectMapper.readTree(responseBody);
				meliProperties.setAccessToken(jsonNode.get("access_token").asText());
				meliProperties.setRefreshToken(jsonNode.get("refresh_token").asText());
			} catch (Exception e) {
				throw new RuntimeException("error al procesar json (meli access token)");
			}
		} else {
			throw new RuntimeException("error al renovar token");
		}
	}

	// el access token de meli es valido por 6 horas
	/*
	@Scheduled(fixedRate = 6 * 60 * 60 * 1000)
	public void renewAccessTokenTask() {
		System.out.println("renovando acces token...");
		renewAccessToken();
		System.out.println("access token: " + meliProperties.getAccessToken());
		System.out.println("refresh token: " + meliProperties.getRefreshToken());
	}
	*/
}