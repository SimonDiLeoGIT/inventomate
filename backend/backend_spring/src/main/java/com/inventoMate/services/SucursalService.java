package com.inventoMate.services;

import java.util.List;

import com.inventoMate.dtos.sucursales.SucursalDTO;
import com.inventoMate.dtos.sucursales.SucursalProfileResponse;
import com.inventoMate.entities.InvitacionSucursal;

public interface SucursalService {

	SucursalProfileResponse createSucursal(String idAuth0, SucursalDTO sucursalDTO);

	SucursalProfileResponse editSucursal(String idAuth0, Long idSucursal, SucursalDTO sucursalDTO);

	SucursalProfileResponse getSucursalProfile(String idAuth0, Long idSucursal);

	void deleteSucursal(String idAuth0, Long idSucursal);

	void inviteUserWithRoles(String idAuth0, Long idSucursal, Long idUsuario, List<Long> idRol);

	void addUserWithRoles(InvitacionSucursal invitacionSucursal);

	void editUserRoles(String idAuth0, Long idSucursal, Long idUsuario, List<Long> idRol);

	SucursalProfileResponse deleteUserFromSucursal(String idAuth0, Long idSucursal, Long idUsuario);

}
