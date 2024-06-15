package com.inventoMate.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.inventoMate.dtos.roles.RolDTO;
import com.inventoMate.repositories.RolRepository;
import com.inventoMate.services.RolService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RolServiceImpl implements RolService {

	private final RolRepository rolRepository;
	private final ModelMapper mapper;

	@Override
	public List<RolDTO> getAll() {
		return rolRepository.findAll().stream().map(rol -> mapper.map(rol, RolDTO.class)).collect(Collectors.toList());
	}

}
