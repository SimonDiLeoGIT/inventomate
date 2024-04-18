package com.inventoMate.dtos.roles;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RolDTO {

	private Long idRol;

	private String nombreRol;

	private String descripcion;
	
	private String idRolAuth0;
	
}
