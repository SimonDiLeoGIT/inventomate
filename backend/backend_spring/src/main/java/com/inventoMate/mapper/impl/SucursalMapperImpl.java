package com.inventoMate.mapper.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.inventoMate.dtos.empresas.EmpresaDTO;
import com.inventoMate.dtos.sucursales.SucursalDTO;
import com.inventoMate.dtos.sucursales.SucursalProfileResponse;
import com.inventoMate.dtos.users.UsuarioDTO;
import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Sucursal;
import com.inventoMate.mapper.SucursalMapper;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class SucursalMapperImpl implements SucursalMapper {

	private final ModelMapper mapper;

	@Override
	public SucursalDTO mapToSucursalDTO(Sucursal sucursal) {
		return sucursal != null ? mapper.map(sucursal, SucursalDTO.class) : null;
	}

	@Override
	public List<SucursalDTO> mapToSucursalDTO(List<Sucursal> sucursales) {
		return sucursales.stream().map(sucu -> mapToSucursalDTO(sucu))
			.collect(Collectors.toList());
	}

	@Override
	public Sucursal mapToSucursal(SucursalDTO sucursalDTO) {
		return Sucursal.builder()
				.idSucCliente(sucursalDTO.getIdSucCliente())
				.nombre(sucursalDTO.getNombre())
				.ubicacion(sucursalDTO.getUbicacion())
				.build();
	}

	@Override
	public SucursalProfileResponse mapToSucursalProfileResponse(Sucursal sucursal, Empresa empresa) {
		return SucursalProfileResponse.builder()
				.empresa(mapper.map(empresa,EmpresaDTO.class))
				.sucursal(mapToSucursalDTO(sucursal))
				.usuarios(sucursal.obtenerEmpleados().stream().map(
						empleado -> mapper.map(empleado, UsuarioDTO.class))
						.collect(Collectors.toList()))
				.build();
	}

}
