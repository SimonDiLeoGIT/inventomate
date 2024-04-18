package com.inventoMate.services;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.dtos.empresas.EmpresaDTO;

public interface EmpresaService {

	EmpresaDTO createEmpresa(String IdAuth0, EmpresaDTO empresa) throws Auth0Exception;

	EmpresaDTO getEmpresaByOwnerAuht0Id(String IdAuth0) throws Auth0Exception;
	
}
