package com.inventoMate.dtos.valoracion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ValoracionRequest {

	private int cantEstrellas;
	private String valoracion;

}
