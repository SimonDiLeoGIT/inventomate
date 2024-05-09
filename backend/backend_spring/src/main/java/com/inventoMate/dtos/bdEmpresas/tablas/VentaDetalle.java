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
public class VentaDetalle {

	private int idVenta;
	private Timestamp fechaHora;
	private DetalleVenta detalle;

}
