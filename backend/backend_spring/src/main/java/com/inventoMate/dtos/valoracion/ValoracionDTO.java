package com.inventoMate.dtos.valoracion;

import java.time.LocalDate;

import com.inventoMate.dtos.informes.InformeDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ValoracionDTO {

	private Long id;
	private LocalDate fecha;
	private InformeDTO informe;
	private int cantEstrellas;
	private String valoracion;

}
