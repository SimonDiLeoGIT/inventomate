package com.inventoMate.mapper.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.inventoMate.dtos.bdEmpresas.BdEmpresaDTO;
import com.inventoMate.entities.BdEmpresa;
import com.inventoMate.entities.Empresa;
import com.inventoMate.mapper.BdEmpresaMapper;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class BdEmpresaMapperImpl implements BdEmpresaMapper {

	private final ModelMapper mapper;

	@Override
	public BdEmpresaDTO mapToBdEmpresaDTO(BdEmpresa bdEmpresa) {
		return mapper.map(bdEmpresa, BdEmpresaDTO.class);
	}

	@Override
	public BdEmpresa mapToBdEmpresa(BdEmpresaDTO bdEmpresaDTO, Empresa empresa) {
		return BdEmpresa.builder().empresa(empresa).gestorBd(bdEmpresaDTO.getGestorBd()).url(bdEmpresaDTO.getUrl())
				.password(bdEmpresaDTO.getPassword()).username(bdEmpresaDTO.getUsername()).build();
	}

	@Override
	public void mapToBdEmpresa(BdEmpresaDTO bdEmpresaDTO, BdEmpresa bdEmpresa) {
		bdEmpresa.setGestorBd(bdEmpresaDTO.getGestorBd());
		bdEmpresa.setUsername(bdEmpresaDTO.getUsername());
		bdEmpresa.setPassword(bdEmpresaDTO.getPassword());
		bdEmpresa.setUrl(bdEmpresaDTO.getUrl());
	}

}
