package com.inventoMate.mapper;

import java.util.List;

import com.inventoMate.dtos.empresas.EditEmpresaRequest;
import com.inventoMate.dtos.empresas.EmpresaDTO;
import com.inventoMate.dtos.empresas.EmpresaProfileResponse;
import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Sucursal;

public interface EmpresaMapper {

	EmpresaDTO mapToEmpresaDTO(Empresa empresa);

	Empresa mapToEmpresa(EmpresaDTO empresaDTO);

	EmpresaProfileResponse mapToEmpresaProfileResponse(Empresa empresa, List<Sucursal> sucursales, boolean isOwner);

	void mapEditRequestToEmpresa(Empresa empresa, EditEmpresaRequest editEmpresaRequest);
	
}
