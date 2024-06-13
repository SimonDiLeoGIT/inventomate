package com.inventoMate.mapper;

import java.util.List;

import com.inventoMate.dtos.valoracion.ValoracionDTO;
import com.inventoMate.dtos.valoracion.ValoracionRequest;
import com.inventoMate.entities.Valoracion;

public interface ValoracionMapper {

	Valoracion mapToValoracion(ValoracionRequest valoracion);

	List<ValoracionDTO> mapToValoracionDTO(List<Valoracion> all);
	
	ValoracionDTO mapToValoracionDTO(Valoracion valoracion);

}
