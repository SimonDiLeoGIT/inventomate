package com.inventoMate.dtos.informes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DecisionRequest {

	private boolean aceptado;
	private String justificacion;
	
}
