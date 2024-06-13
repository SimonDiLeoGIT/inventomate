package com.inventoMate.mapper.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.inventoMate.dtos.tiempoInforme.TiempoInformeDTO;
import com.inventoMate.entities.TiempoInforme;
import com.inventoMate.mapper.TiempoInformeMapper;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class TiempoInformeMapperImpl implements TiempoInformeMapper{

	private final ModelMapper mapper;
	
	@Override
	public List<TiempoInformeDTO> mapToTiempoInformeDTO(List<TiempoInforme> tiempoInformes) {
		return tiempoInformes.stream().map(tiempoInforme -> mapper.map(tiempoInforme, TiempoInformeDTO.class))
				.collect(Collectors.toList());
	}

}
