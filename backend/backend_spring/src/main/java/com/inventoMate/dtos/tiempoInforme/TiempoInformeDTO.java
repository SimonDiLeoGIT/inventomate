package com.inventoMate.dtos.tiempoInforme;

import java.time.LocalDate;
import java.time.LocalTime;

import com.inventoMate.dtos.informes.InformeDTO;
import com.inventoMate.entities.TipoInforme;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TiempoInformeDTO {

	private Long id;
	private InformeDTO informe;
	private TipoInforme tipoInforme;
	private LocalDate fecha;
	private LocalTime tiempoInicio;
	private LocalTime tiempoFin;
	private Long duracionSegundos;

}