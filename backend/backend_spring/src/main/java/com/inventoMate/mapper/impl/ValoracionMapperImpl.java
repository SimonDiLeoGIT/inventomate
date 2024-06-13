package com.inventoMate.mapper.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.inventoMate.dtos.valoracion.ValoracionDTO;
import com.inventoMate.dtos.valoracion.ValoracionRequest;
import com.inventoMate.dtos.valoracion.ValoracionStatsResponse;
import com.inventoMate.entities.Valoracion;
import com.inventoMate.mapper.ValoracionMapper;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class ValoracionMapperImpl implements ValoracionMapper {

	private final ModelMapper mapper;

	@Override
	public Valoracion mapToValoracion(ValoracionRequest valoracion) {
		return mapper.map(valoracion, Valoracion.class);
	}

	@Override
	public List<ValoracionDTO> mapToValoracionDTO(List<Valoracion> valoraciones) {
		return valoraciones.stream().map(valoracion -> mapToValoracionDTO(valoracion)).collect(Collectors.toList());
	}

	@Override
	public ValoracionDTO mapToValoracionDTO(Valoracion valoracion) {
		return mapper.map(valoracion, ValoracionDTO.class);
	}

	@Override
	public ValoracionStatsResponse mapToValoracionStatsResponse(int cantValoraciones, int cantValoracionesNexTrends,
			int cantValoracionesObsolescencia, int cantValoracionesProyeccion, int cantValoracionesTendencias,
			Double promedioValoraciones, Double promedioValoracionesNexTrends, Double promedioValoracionesObsolescencia,
			Double promedioValoracionesProyeccion, Double promedioValoracionesTendencias) {
		return ValoracionStatsResponse.builder().cantValoraciones(cantValoraciones)
				.cantValoracionesTendencias(cantValoracionesTendencias)
				.cantValoracionesProyeccion(cantValoracionesProyeccion)
				.cantValoracionesNexTrends(cantValoracionesNexTrends)
				.cantValoracionesObsolescencia(cantValoracionesObsolescencia)
				.promedioValoraciones(promedioValoraciones != null ? promedioValoraciones : 0.0)
				.promedioValoracionesTendencias(
						promedioValoracionesTendencias != null ? promedioValoracionesTendencias : 0.0)
				.promedioValoracionesProyeccion(
						promedioValoracionesProyeccion != null ? promedioValoracionesProyeccion : 0.0)
				.promedioValoracionesNexTrends(
						promedioValoracionesNexTrends != null ? promedioValoracionesNexTrends : 0.0)
				.promedioValoracionesObsolescencia(
						promedioValoracionesObsolescencia != null ? promedioValoracionesObsolescencia : 0.0)
				.build();
	}

}
