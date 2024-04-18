package com.inventoMate.dtos.sucursales;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SucursalDTO {

	private Long idSucursal;

	private String nombre;

	private String ubicacion;

	private String idSucCliente;

}
