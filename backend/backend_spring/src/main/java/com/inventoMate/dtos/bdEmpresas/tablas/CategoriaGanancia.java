package com.inventoMate.dtos.bdEmpresas.tablas;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@NoArgsConstructor
@Data
public class CategoriaGanancia {

	private Long idCategoria;
	private String nombre;
	private Double porcentajeGananciaPromedio;
	
}
