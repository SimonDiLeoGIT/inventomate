package com.inventoMate.services;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.inventoMate.dtos.valoracion.ValoracionDTO;
import com.inventoMate.entities.TipoInforme;

public interface AdminService {

	Page<ValoracionDTO> getValoraciones(Pageable pageable, TipoInforme tipoInforme, Integer estrellas, LocalDate fechaInicio, LocalDate fechaFin);

}
