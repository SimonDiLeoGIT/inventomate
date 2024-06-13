package com.inventoMate.services;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.inventoMate.dtos.errores.ErrorDTO;
import com.inventoMate.dtos.informes.InformeStatsResponse;
import com.inventoMate.dtos.tiempoInforme.TiempoInformeDTO;
import com.inventoMate.dtos.valoracion.ValoracionDTO;
import com.inventoMate.dtos.valoracion.ValoracionStatsResponse;
import com.inventoMate.entities.TipoInforme;

public interface AdminService {

	Page<ValoracionDTO> getValoraciones(Pageable pageable, TipoInforme tipoInforme, Integer estrellas, LocalDate fechaInicio, LocalDate fechaFin);

	ValoracionStatsResponse getValoracionesStats(LocalDate desde, LocalDate hasta);

	InformeStatsResponse getInformeStats(LocalDate desde, LocalDate hasta);

	Page<TiempoInformeDTO> getTiemposInforme(Pageable pageable, TipoInforme tipoInforme, LocalDate fechaInicio,
			LocalDate fechaFin);

	Page<ErrorDTO> getErrores(LocalDate desde, LocalDate hasta, LocalTime horaInicio, LocalTime horaFin, int page,
			int size, String sort, String sortDirection, Pageable pageable);

}
