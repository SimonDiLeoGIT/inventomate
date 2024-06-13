package com.inventoMate.dtos.valoracion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ValoracionStatsResponse {

	private int cantValoraciones;
	private int cantValoracionesTendencias;
	private int cantValoracionesProyeccion;
	private int cantValoracionesNexTrends;
	private int cantValoracionesObsolescencia;
	private Double promedioValoraciones;
	private Double promedioValoracionesTendencias;
	private Double promedioValoracionesProyeccion;
	private Double promedioValoracionesNexTrends;
	private Double promedioValoracionesObsolescencia;
	
}
