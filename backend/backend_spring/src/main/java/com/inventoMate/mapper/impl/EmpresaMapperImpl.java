package com.inventoMate.mapper.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.inventoMate.dtos.empresas.EditEmpresaRequest;
import com.inventoMate.dtos.empresas.EmpresaDTO;
import com.inventoMate.dtos.empresas.EmpresaProfileResponse;
import com.inventoMate.dtos.sucursales.SucursalDTO;
import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Sucursal;
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

	@Override
	public Empresa mapToEmpresa(EmpresaDTO empresaDTO) {
		return mapper.map(empresaDTO, Empresa.class);
	}

	@Override
	public EmpresaProfileResponse mapToEmpresaProfileResponse(Empresa empresa, List<Sucursal> sucursales,
			boolean isOwner) {
		return EmpresaProfileResponse.builder()
				.empresa(mapToEmpresaDTO(empresa))
				.sucursales(sucursales.stream().map(
						sucursal -> mapper.map(sucursal, SucursalDTO.class))
						.collect(Collectors.toList()))
				.isOwner(isOwner)
				.build();
	}

	@Override
	public void mapEditRequestToEmpresa(Empresa empresa, EditEmpresaRequest editEmpresaRequest) {
		empresa.setDescripcion(editEmpresaRequest.getDescripcion());
		empresa.setNombreEmpresa(editEmpresaRequest.getNombreEmpresa());
		empresa.setLogo(editEmpresaRequest.getLogo());
	}

}
