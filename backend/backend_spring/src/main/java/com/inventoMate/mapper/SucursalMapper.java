package com.inventoMate.mapper;

import com.inventoMate.dtos.sucursales.SucursalDTO;
import com.inventoMate.entities.Sucursal;

public interface SucursalMapper {

	SucursalDTO mapToSucursalDTO(Sucursal sucursal);

}
