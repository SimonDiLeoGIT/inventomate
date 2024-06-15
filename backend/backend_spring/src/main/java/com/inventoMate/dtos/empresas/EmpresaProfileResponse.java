package com.inventoMate.dtos.empresas;

import java.util.List;

import com.inventoMate.dtos.sucursales.SucursalDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmpresaProfileResponse {

	private boolean isOwner;
	private EmpresaDTO empresa;
	private List<SucursalDTO> sucursales;

}
