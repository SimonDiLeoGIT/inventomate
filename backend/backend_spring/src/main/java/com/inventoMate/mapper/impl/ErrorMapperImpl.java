package com.inventoMate.mapper.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.inventoMate.dtos.errores.ErrorDTO;
import com.inventoMate.entities.Error;
import com.inventoMate.mapper.ErrorMapper;

import lombok.AllArgsConstructor;
import lombok.Data;

@Component
@AllArgsConstructor
@Data
public class ErrorMapperImpl implements ErrorMapper {

	private final ModelMapper mapper;
	
	@Override
	public ErrorDTO mapToErrorDTO(Error error) {
		return mapper.map(error, ErrorDTO.class);
	}

	@Override
	public List<ErrorDTO> mapToErrorDTO(List<Error> errores) {
		return errores.stream().map(this::mapToErrorDTO).collect(Collectors.toList());
	}

}
