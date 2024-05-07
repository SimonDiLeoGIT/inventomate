package com.inventoMate.mapper;

import java.util.List;

import com.inventoMate.dtos.roles.RolDTO;
import com.inventoMate.entities.Rol;

public interface RolMapper {

	RolDTO mapToRolDTO(Rol rol);

	List<RolDTO> mapToRolDTO(List<Rol> roles);

}
