package com.inventoMate.services;

import java.util.List;
import java.util.Map;

import com.inventoMate.dtos.meli.TrendsDTO;

public interface MlService {

	TrendsDTO getTendencias(List<String> products);
	Map<String, String> refreshToken();
	
}
