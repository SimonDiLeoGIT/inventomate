package com.inventoMate.mapper;

import java.util.List;

import com.inventoMate.dtos.tiempoInforme.TiempoInformeDTO;
import com.inventoMate.entities.TiempoInforme;

public interface TiempoInformeMapper {

	List<TiempoInformeDTO> mapToTiempoInformeDTO(List<TiempoInforme> tiempoInformes);
	
}
