package com.inventoMate.mapper;

import java.util.List;

import com.inventoMate.dtos.sucursales.SucursalDTO;
import com.inventoMate.entities.Sucursal;

public interface SucursalMapper {

	SucursalDTO mapToSucursalDTO(Sucursal sucursal);

	List<SucursalDTO> mapToSucursalDTO(List<Sucursal> sucursales);
}
