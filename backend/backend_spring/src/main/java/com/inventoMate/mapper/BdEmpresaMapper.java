package com.inventoMate.mapper;

import com.inventoMate.dtos.bdEmpresas.BdEmpresaDTO;
import com.inventoMate.entities.BdEmpresa;
import com.inventoMate.entities.Empresa;

public interface BdEmpresaMapper {

	BdEmpresaDTO mapToBdEmpresaDTO(BdEmpresa bdEmpresa);

	BdEmpresa mapToBdEmpresa(BdEmpresaDTO bdEmpresaDTO, Empresa empresa);

	void mapToBdEmpresa(BdEmpresaDTO bdEmpresaDTO, BdEmpresa bdEmpresa);
	
}
