package com.inventoMate.dtos.users;

import java.util.List;

import com.inventoMate.dtos.empresas.EmpresaDTO;
import com.inventoMate.dtos.roles.RolDTO;
import com.inventoMate.dtos.sucursales.SucursalDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioProfileResponse {

	private UsuarioDTO usuario;

	private EmpresaDTO empresa;

	private SucursalDTO sucursal;

	private List<RolDTO> roles;

}
