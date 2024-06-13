package com.inventoMate.services.impl;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.inventoMate.dtos.valoracion.ValoracionDTO;
import com.inventoMate.entities.TipoInforme;
import com.inventoMate.entities.Valoracion;
import com.inventoMate.mapper.ValoracionMapper;
import com.inventoMate.repositories.ValoracionRepository;
import com.inventoMate.services.AdminService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final ValoracionRepository valoracionRepository;
	private final ValoracionMapper valoracionMapper;

	@Override
	public Page<ValoracionDTO> getValoraciones(Pageable pageable, TipoInforme tipoInforme, Integer estrellas,
			LocalDate fechaInicio, LocalDate fechaFin) {
		Page<Valoracion> valoraciones = valoracionRepository.findByFilters(tipoInforme, estrellas, fechaInicio,
				fechaFin, pageable);
		return valoraciones.map(valoracionMapper::mapToValoracionDTO);
	}

}
