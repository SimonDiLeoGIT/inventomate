package com.inventoMate.mapper.impl;

import java.util.Map;

import org.springframework.stereotype.Component;

import com.inventoMate.entities.MeliToken;
import com.inventoMate.mapper.meliTokenMapper;

@Component
public class MeliTokenMapperImpl implements meliTokenMapper {

	@Override
	public MeliToken mapToMeliToken(Map<String, String> response) {
		return MeliToken.builder()
				.accessToken(response.get("access_token"))
				.id("Bearer")
				.refreshToken(response.get("refresh_token"))
				.build();
	}

}
