package com.inventoMate.services;

import com.inventoMate.dtos.sucursales.SucursalDTO;
import com.inventoMate.dtos.sucursales.SucursalProfileResponse;

public interface SucursalService {

	SucursalProfileResponse createSucursal(String idAuth0, SucursalDTO sucursalDTO);

	SucursalProfileResponse editSucursal(String idAuth0, Long idSucursal, SucursalDTO sucursalDTO);

	SucursalProfileResponse getSucursalProfile(String idAuth0, Long idSucursal);

	void deleteSucursal(String idAuth0, Long idSucursal);

}
