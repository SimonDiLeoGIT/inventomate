package com.inventoMate.mapper.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.inventoMate.dtos.valoracion.ValoracionDTO;
import com.inventoMate.dtos.valoracion.ValoracionRequest;
import com.inventoMate.entities.Valoracion;
import com.inventoMate.mapper.ValoracionMapper;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class ValoracionMapperImpl implements ValoracionMapper {

	private final ModelMapper mapper;

	@Override
	public Valoracion mapToValoracion(ValoracionRequest valoracion) {
		return mapper.map(valoracion, Valoracion.class);
	}

	@Override
	public List<ValoracionDTO> mapToValoracionDTO(List<Valoracion> valoraciones) {
		return valoraciones.stream().map(valoracion -> mapToValoracionDTO(valoracion)).collect(Collectors.toList());
	}

	@Override
	public ValoracionDTO mapToValoracionDTO(Valoracion valoracion) {
		return mapper.map(valoracion, ValoracionDTO.class);
	}

}
