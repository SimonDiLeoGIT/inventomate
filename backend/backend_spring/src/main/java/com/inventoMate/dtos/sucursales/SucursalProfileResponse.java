package com.inventoMate.dtos.sucursales;

import java.util.List;

import com.inventoMate.dtos.empresas.EmpresaDTO;
import com.inventoMate.dtos.users.UsuarioDTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SucursalProfileResponse {

	private EmpresaDTO empresa;
	private SucursalDTO sucursal;
	private List<UsuarioDTO> usuarios;
}
