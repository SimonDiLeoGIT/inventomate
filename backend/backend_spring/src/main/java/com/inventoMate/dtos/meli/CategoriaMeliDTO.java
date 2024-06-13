package com.inventoMate.dtos.meli;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoriaMeliDTO {

	private Long id;
	private String nombre;
	private String idMeli;
	private List<ProductoMeliDTO> productos;

}
