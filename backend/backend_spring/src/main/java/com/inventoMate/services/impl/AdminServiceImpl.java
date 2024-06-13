package com.inventoMate.services.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.inventoMate.dtos.informes.InformeStatsResponse;
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
	public ValoracionStatsResponse getValoracionesStats(LocalDate desde, LocalDate hasta) {

		int cantValoraciones = (int) valoracionRepository.countByFechas(desde, hasta);
		int cantValoracionesTendencias = valoracionRepository
				.countByTipoInformeAndFechas(TipoInforme.ANALISIS_DE_TENDENCIA,desde,hasta);
		int cantValoracionesProyeccion = valoracionRepository
				.countByTipoInformeAndFechas(TipoInforme.PROYECCION_DE_VENTAS,desde,hasta);
		int cantValoracionesNexTrends = valoracionRepository.countByTipoInformeAndFechas(TipoInforme.SIGUIENTES_PEDIDOS,desde,hasta);
		int cantValoracionesObsolescencia = valoracionRepository.countByTipoInformeAndFechas(TipoInforme.OBSOLESCENCIA,desde,hasta);

		Double promedioValoraciones = valoracionRepository.averageCantEstrellasByFechas(desde,hasta);
		Double promedioValoracionesTendencias = valoracionRepository
				.averageCantEstrellasByTipoInformeAndFechas(TipoInforme.ANALISIS_DE_TENDENCIA,desde,hasta);
		Double promedioValoracionesProyeccion = valoracionRepository
				.averageCantEstrellasByTipoInformeAndFechas(TipoInforme.PROYECCION_DE_VENTAS, desde, hasta);
		Double promedioValoracionesNexTrends = valoracionRepository
				.averageCantEstrellasByTipoInformeAndFechas(TipoInforme.SIGUIENTES_PEDIDOS, desde, hasta);
		Double promedioValoracionesObsolescencia = valoracionRepository
				.averageCantEstrellasByTipoInformeAndFechas(TipoInforme.OBSOLESCENCIA, desde, hasta);

		return valoracionMapper.mapToValoracionStatsResponse(cantValoraciones, cantValoracionesNexTrends,
				cantValoracionesObsolescencia, cantValoracionesProyeccion, cantValoracionesTendencias,
				promedioValoraciones, promedioValoracionesNexTrends, promedioValoracionesObsolescencia,
				promedioValoracionesProyeccion, promedioValoracionesTendencias);
	}

	@Override
	public InformeStatsResponse getInformeStats(LocalDate desde, LocalDate hasta) {
		
        int cantInformes = (int) tiempoInformeRepository.countByFechas(desde, hasta);
        int cantInformesTendencias = tiempoInformeRepository.countByTipoInformeAndFechas(TipoInforme.ANALISIS_DE_TENDENCIA, desde, hasta);
        int cantInformesProyeccion = tiempoInformeRepository.countByTipoInformeAndFechas(TipoInforme.PROYECCION_DE_VENTAS, desde, hasta);
        int cantInformesNexTrends = tiempoInformeRepository.countByTipoInformeAndFechas(TipoInforme.SIGUIENTES_PEDIDOS, desde, hasta);
        int cantInformesObsolescencia = tiempoInformeRepository.countByTipoInformeAndFechas(TipoInforme.OBSOLESCENCIA, desde, hasta);

        Double tiemposPromedio = tiempoInformeRepository.averageDuracionSegundosByTipoInformeAndFechas(TipoInforme.ANALISIS_DE_TENDENCIA, desde, hasta);
        Double tiemposPromedioTendencias = tiempoInformeRepository.averageDuracionSegundosByTipoInformeAndFechas(TipoInforme.ANALISIS_DE_TENDENCIA, desde, hasta);
        Double tiemposPromedioProyeccion = tiempoInformeRepository.averageDuracionSegundosByTipoInformeAndFechas(TipoInforme.PROYECCION_DE_VENTAS, desde, hasta);
        Double tiemposPromedioNexTrends = tiempoInformeRepository.averageDuracionSegundosByTipoInformeAndFechas(TipoInforme.SIGUIENTES_PEDIDOS, desde, hasta);
        Double tiemposPromedioObsolescencia = tiempoInformeRepository.averageDuracionSegundosByTipoInformeAndFechas(TipoInforme.OBSOLESCENCIA, desde, hasta);

        // Mapear los resultados a InformeStatsResponse usando el mapper
        return tiempoInformeMapper.mapToInformeStatsResponse(
                cantInformes, cantInformesTendencias, cantInformesProyeccion, cantInformesNexTrends, cantInformesObsolescencia,
                tiemposPromedio, tiemposPromedioTendencias, tiemposPromedioProyeccion, tiemposPromedioNexTrends, tiemposPromedioObsolescencia
        );
	}

}
