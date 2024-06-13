package com.inventoMate.dtos.bdEmpresas.tablas;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class CategoriaRangoPrecios {

	private int idCategoria;
	private String nombreCategoria;
	private double precioMinimo;
	private double precioMaximo;

}
