package com.inventoMate.dtos.empresas;

import com.inventoMate.dtos.users.OwnerDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmpresaDTO {

	private Long idEmpresa;

	private String nombreEmpresa;

	private String descripcion;

	private String logo;

	private OwnerDTO owner;

}
