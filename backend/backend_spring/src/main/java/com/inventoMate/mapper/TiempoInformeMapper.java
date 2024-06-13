package com.inventoMate.mapper;

import java.util.List;

import com.inventoMate.dtos.informes.InformeStatsResponse;
import com.inventoMate.dtos.tiempoInforme.TiempoInformeDTO;
import com.inventoMate.entities.TiempoInforme;

public interface TiempoInformeMapper {

	List<TiempoInformeDTO> mapToTiempoInformeDTO(List<TiempoInforme> tiempoInformes);
	
	TiempoInformeDTO mapToTiempoInformeDTO(TiempoInforme tiempoInforme);

	InformeStatsResponse mapToInformeStatsResponse(int cantInformes, int cantInformesTendencias,
			int cantInformesProyeccion, int cantInformesNexTrends, int cantInformesObsolescencia,
			Double tiemposPromedio, Double tiemposPromedioTendencias, Double tiemposPromedioProyeccion,
			Double tiemposPromedioNexTrends, Double tiemposPromedioObsolescencia);
	
}
