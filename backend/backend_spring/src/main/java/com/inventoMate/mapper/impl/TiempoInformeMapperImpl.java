package com.inventoMate.mapper.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.inventoMate.dtos.informes.InformeStatsResponse;
import com.inventoMate.dtos.tiempoInforme.TiempoInformeDTO;
import com.inventoMate.entities.TiempoInforme;
import com.inventoMate.mapper.TiempoInformeMapper;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class TiempoInformeMapperImpl implements TiempoInformeMapper {

	private final ModelMapper mapper;

	@Override
	public List<TiempoInformeDTO> mapToTiempoInformeDTO(List<TiempoInforme> tiempoInformes) {
		return tiempoInformes.stream().map(tiempoInforme -> mapper.map(tiempoInforme, TiempoInformeDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public InformeStatsResponse mapToInformeStatsResponse(int cantInformes, int cantInformesTendencias,
			int cantInformesProyeccion, int cantInformesNexTrends, int cantInformesObsolescencia,
			Double tiemposPromedio, Double tiemposPromedioTendencias, Double tiemposPromedioProyeccion,
			Double tiemposPromedioNexTrends, Double tiemposPromedioObsolescencia) {
		return InformeStatsResponse.builder().cantInformes(cantInformes).cantInformesTendencias(cantInformesTendencias)
				.cantInformesProyeccion(cantInformesProyeccion).cantInformesNexTrends(cantInformesNexTrends)
				.cantInformesObsolescencia(cantInformesObsolescencia)
				.tiemposPromedio(tiemposPromedio != null ? tiemposPromedio : 0.0)
				.tiemposPromedioTendencias(tiemposPromedioTendencias != null ? tiemposPromedioTendencias : 0.0)
				.tiemposPromedioProyeccion(tiemposPromedioProyeccion != null ? tiemposPromedioProyeccion : 0.0)
				.tiemposPromedioNexTrends(tiemposPromedioNexTrends != null ? tiemposPromedioNexTrends : 0.0)
				.tiemposPromedioObsolescencia(tiemposPromedioObsolescencia != null ? tiemposPromedioObsolescencia : 0.0)
				.build();
	}

}
