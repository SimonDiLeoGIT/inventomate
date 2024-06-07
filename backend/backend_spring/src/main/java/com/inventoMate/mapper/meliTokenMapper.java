package com.inventoMate.mapper;

import java.util.Map;

import com.inventoMate.entities.MeliToken;

public interface meliTokenMapper {

	MeliToken mapToMeliToken(Map<String,String> response);
	
}
