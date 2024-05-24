package com.inventoMate.dtos.bdEmpresas.tablas;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
public class ProductoSucursalInfo {

	private Integer productId;
	private String nombre;
	private Integer stock;
	private Timestamp fechaPrimerCompra;

}
