package com.inventoMate.mapper;

import java.util.List;

import com.inventoMate.dtos.sucursales.SucursalDTO;
import com.inventoMate.dtos.sucursales.SucursalProfileResponse;
import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Sucursal;

public interface SucursalMapper {

	SucursalDTO mapToSucursalDTO(Sucursal sucursal);

	List<SucursalDTO> mapToSucursalDTO(List<Sucursal> sucursales);

	Sucursal mapToSucursal(SucursalDTO sucursalDTO);
	
	SucursalProfileResponse mapToSucursalProfileResponse(Sucursal sucursal, Empresa empresa);
}
