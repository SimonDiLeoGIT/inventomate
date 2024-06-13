package com.inventoMate.services.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.inventoMate.dtos.tiempoInforme.TiempoInformeDTO;
import com.inventoMate.dtos.valoracion.ValoracionDTO;
import com.inventoMate.dtos.valoracion.ValoracionStatsResponse;
import com.inventoMate.entities.TipoInforme;
import com.inventoMate.entities.Valoracion;
import com.inventoMate.mapper.TiempoInformeMapper;
import com.inventoMate.mapper.ValoracionMapper;
import com.inventoMate.repositories.TiempoInformeRepository;
import com.inventoMate.repositories.ValoracionRepository;
import com.inventoMate.services.AdminService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final ValoracionRepository valoracionRepository;
	private final TiempoInformeRepository tiempoInformeRepository;
	private final TiempoInformeMapper tiempoInformeMapper;
	private final ValoracionMapper valoracionMapper;

	@Override
	public Page<ValoracionDTO> getValoraciones(Pageable pageable, TipoInforme tipoInforme, Integer estrellas,
			LocalDate fechaInicio, LocalDate fechaFin) {
		Page<Valoracion> valoraciones = valoracionRepository.findByFilters(tipoInforme, estrellas, fechaInicio,
				fechaFin, pageable);
		return valoraciones.map(valoracionMapper::mapToValoracionDTO);
	}

	@Override
	public List<TiempoInformeDTO> getTiempos() {
		return tiempoInformeMapper.mapToTiempoInformeDTO(tiempoInformeRepository.findAll());
	}

	@Override
	public ValoracionStatsResponse getValoracionesStats() {

		int cantValoraciones = (int) valoracionRepository.count();
		int cantValoracionesTendencias = valoracionRepository
				.countByTipoInforme(TipoInforme.ANALISIS_DE_TENDENCIA);
		int cantValoracionesProyeccion = valoracionRepository
				.countByTipoInforme(TipoInforme.PROYECCION_DE_VENTAS);
		int cantValoracionesNexTrends = valoracionRepository.countByTipoInforme(TipoInforme.SIGUIENTES_PEDIDOS);
		int cantValoracionesObsolescencia = valoracionRepository.countByTipoInforme(TipoInforme.OBSOLESCENCIA);

		Double promedioValoraciones = valoracionRepository.averageByCantEstrellas();
		Double promedioValoracionesTendencias = valoracionRepository
				.averageByCantEstrellasAndTipoInforme(TipoInforme.ANALISIS_DE_TENDENCIA);
		Double promedioValoracionesProyeccion = valoracionRepository
				.averageByCantEstrellasAndTipoInforme(TipoInforme.PROYECCION_DE_VENTAS);
		Double promedioValoracionesNexTrends = valoracionRepository
				.averageByCantEstrellasAndTipoInforme(TipoInforme.SIGUIENTES_PEDIDOS);
		Double promedioValoracionesObsolescencia = valoracionRepository
				.averageByCantEstrellasAndTipoInforme(TipoInforme.OBSOLESCENCIA);

		return valoracionMapper.mapToValoracionStatsResponse(cantValoraciones, cantValoracionesNexTrends,
				cantValoracionesObsolescencia, cantValoracionesProyeccion, cantValoracionesTendencias,
				promedioValoraciones, promedioValoracionesNexTrends, promedioValoracionesObsolescencia,
				promedioValoracionesProyeccion, promedioValoracionesTendencias);
	}

}
