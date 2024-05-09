package com.inventoMate.services.impl;

import java.net.URI;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.inventoMate.dtos.meli.TrendsDTO;
import com.inventoMate.entities.TipoInforme;
import com.inventoMate.services.FlaskService;

import lombok.AllArgsConstructor;
import net.minidev.json.JSONObject;

@Service
@AllArgsConstructor
public class FlaskServiceImpl implements FlaskService {

	private final String url = "http://127.0.0.1:5000/";
	private final RestTemplate restTemplate;
	
	@Override
	public String postDatosInformeTendencias(TrendsDTO trendsDTO) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		ObjectMapper objectMapper = new ObjectMapper();
		String requestBody;
		try {
			requestBody = objectMapper.writeValueAsString(trendsDTO);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return null;
		}
		HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url).path("api")
				.path("/informe").path("/tendencias").path("/add");
		URI uri = builder.build(true).toUri();
		return restTemplate.postForEntity(uri, request, JSONObject.class).getBody().get("ID-Mongo").toString();
	}

	@Override
	public String postDatosInformeProyeccionDeVentas(JSONObject jsonObject) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<String> request = new HttpEntity<>(jsonObject.toJSONString(), headers);
		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url).path("api").path("/informe")
				.path("/proyeccion-de-ventas").path("/add");
		URI uri = builder.build(true).toUri();
		return restTemplate.postForEntity(uri, request, JSONObject.class).getBody().get("ID-Mongo").toString();
	}

	@Override
	public Object getDatosInformeByTipoInforme(String idMongo, TipoInforme tipoInforme) {
		Object response = null;
		switch(tipoInforme) {
		case ANALISIS_DE_TENDENCIA :
			response = getDatosInformeTendencias(idMongo);
			break;
		case PROYECCION_DE_VENTAS :
			response = getDatosInformeDeProyeccionDeVentas(idMongo);
		}
		return response;
	}
	
	private Object getDatosInformeDeProyeccionDeVentas(String idMongo) {
	    UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url)
	            .path("api").path("/informe").path("/proyeccion-de-ventas")
	            .queryParam("idMongo", idMongo);
	    URI uri = builder.build().toUri();
	    ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, null, Object.class);
	    return responseEntity.getBody();
	}

	private Object getDatosInformeTendencias(String idMongo) {
	    UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url)
	            .path("api").path("/informe").path("/tendencias")
	            .queryParam("idMongo", idMongo);
	    URI uri = builder.build().toUri();
	    ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, null, Object.class);
	    return responseEntity.getBody();
	}
}
