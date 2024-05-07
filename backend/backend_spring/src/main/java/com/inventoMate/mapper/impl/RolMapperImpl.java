package com.inventoMate.mapper.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.inventoMate.dtos.roles.RolDTO;
import com.inventoMate.entities.Rol;
import com.inventoMate.mapper.RolMapper;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class RolMapperImpl implements RolMapper {

	private final ModelMapper mapper;

	@Override
	public RolDTO mapToRolDTO(Rol rol) {
		return rol != null ? mapper.map(rol, RolDTO.class) : null;
	}

	@Override
	public List<RolDTO> mapToRolDTO(List<Rol> roles) {
		return roles.stream().map(rol -> mapToRolDTO(rol)).collect(Collectors.toList());
	}

}
