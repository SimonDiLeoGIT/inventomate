package com.inventoMate.mapper;

import java.util.List;

import com.inventoMate.dtos.errores.ErrorDTO;
import com.inventoMate.entities.Error;

public interface ErrorMapper {

	ErrorDTO mapToErrorDTO(Error error);
	
	List<ErrorDTO> mapToErrorDTO(List<Error> errores);
	
}
