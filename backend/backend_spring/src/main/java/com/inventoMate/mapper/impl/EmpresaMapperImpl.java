package com.inventoMate.mapper.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.inventoMate.dtos.empresas.EmpresaDTO;
import com.inventoMate.entities.Empresa;
import com.inventoMate.mapper.EmpresaMapper;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class EmpresaMapperImpl implements EmpresaMapper {

	private final ModelMapper mapper;

	@Override
	public EmpresaDTO mapToEmpresaDTO(Empresa empresa) {
		return empresa != null ? mapper.map(empresa, EmpresaDTO.class) : null;
	}

}
