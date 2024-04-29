package com.inventoMate.services;

import com.inventoMate.dtos.bdEmpresas.BdEmpresaDTO;

public interface BdEmpresaService {

	BdEmpresaDTO createBdEmpresa(String idAuth0, BdEmpresaDTO bdEmpresaDTO);

	BdEmpresaDTO editBdEmpresa(String idAuth0, BdEmpresaDTO bdEmpresaDTO);

	void deleteEmpresa(String idAuth0);
	
}
