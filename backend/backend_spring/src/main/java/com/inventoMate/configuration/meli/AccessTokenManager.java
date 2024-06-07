package com.inventoMate.configuration.meli;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.inventoMate.mapper.meliTokenMapper;
import com.inventoMate.repositories.MeliTokenRepository;
import com.inventoMate.services.MlService;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class AccessTokenManager {

	private final MlService mlService;
	private final MeliTokenRepository meliTokenRepository;
	private final meliTokenMapper meliTokenMapper;

	@Scheduled(fixedRate = 5 * 60 * 60 * 1000)
	public void renewAccessTokenTask() {
		try {
			var response = mlService.refreshToken();
			meliTokenRepository.save(meliTokenMapper.mapToMeliToken(response));
			System.out.println("Obteniendo access token de Meli...");
		} catch (Exception e) {
			System.err.println("Error al renovar el token de acceso: " + e.getMessage());
		}
	}

}