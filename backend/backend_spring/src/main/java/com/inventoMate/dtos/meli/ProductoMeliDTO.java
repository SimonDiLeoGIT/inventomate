package com.inventoMate.dtos.meli;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductoMeliDTO {

	private Long id;
	private String idMeli;
	private Integer trendPosition;
	private LocalDate fecha;
	private String nombre;
	private String precio;
	private String divisa;
	
}
