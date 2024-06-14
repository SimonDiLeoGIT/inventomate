package com.inventoMate.mapper;

import java.util.List;

import com.inventoMate.dtos.valoracion.ValoracionDTO;
import com.inventoMate.dtos.valoracion.ValoracionRequest;
import com.inventoMate.dtos.valoracion.ValoracionStatsResponse;
import com.inventoMate.entities.Valoracion;

public interface ValoracionMapper {

	Valoracion mapToValoracion(ValoracionRequest valoracion);

	List<ValoracionDTO> mapToValoracionDTO(List<Valoracion> all);
	
	ValoracionDTO mapToValoracionDTO(Valoracion valoracion);

	ValoracionStatsResponse mapToValoracionStatsResponse(int cantValoraciones, int cantValoracionesNexTrends,
			int cantValoracionesObsolescencia, int cantValoracionesProyeccion, int cantValoracionesTendencias,
			Double promedioValoraciones, Double promedioValoracionesNexTrends, Double promedioValoracionesObsolescencia,
			Double promedioValoracionesProyeccion, Double promedioValoracionesTendencias);

}
