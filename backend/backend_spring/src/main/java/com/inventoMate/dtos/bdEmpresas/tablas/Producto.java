package com.inventoMate.dtos.bdEmpresas.tablas;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class Producto {

	private int idProducto;
	private String nombre;
	private Categoria categoria;

}
