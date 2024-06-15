package com.inventoMate.dtos.informes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DecisionDTO {

	private Long id;
	private String justificacion;
	private boolean aceptado;

}
