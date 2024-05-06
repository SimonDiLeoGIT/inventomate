package com.inventoMate.mapper;

import com.inventoMate.dtos.empresas.EmpresaDTO;
import com.inventoMate.entities.Empresa;

public interface EmpresaMapper {

	EmpresaDTO mapToEmpresaDTO(Empresa empresa);

}
