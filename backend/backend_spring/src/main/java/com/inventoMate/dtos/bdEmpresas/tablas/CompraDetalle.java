package com.inventoMate.dtos.bdEmpresas.tablas;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class CompraDetalle {

	private int idCompra;
	private Timestamp fechaHora;
	private DetalleCompra detalle;

}
