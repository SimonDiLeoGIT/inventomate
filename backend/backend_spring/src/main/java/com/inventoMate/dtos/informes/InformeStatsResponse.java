package com.inventoMate.dtos.informes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class InformeStatsResponse {

	private int cantInformes;
	private int cantInformesTendencias;
	private int cantInformesProyeccion;
	private int cantInformesNexTrends;
	private int cantInformesObsolescencia;
	private Double tiemposPromedio;
	private Double tiemposPromedioTendencias;
	private Double tiemposPromedioProyeccion;
	private Double tiemposPromedioNexTrends;
	private Double tiemposPromedioObsolescencia;
	
}
