package com.inventoMate.dtos.bdEmpresas.tablas;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class DetalleVenta {
	private int cantidad;
	private double precioUnitario;
	private double subtotal;
	private double promo;
	private Producto producto;
}
