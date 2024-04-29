package com.inventoMate.services;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.dtos.empresas.EditEmpresaRequest;
import com.inventoMate.dtos.empresas.EmpresaDTO;
import com.inventoMate.dtos.empresas.EmpresaProfileResponse;

public interface EmpresaService {

	EmpresaDTO createEmpresa(String IdAuth0, EmpresaDTO empresa) throws Auth0Exception;

	EmpresaProfileResponse getEmpresaProfile(String idAuth0);

	EmpresaProfileResponse updateEmpresa(String idAuth0, EditEmpresaRequest editEmpresaRequest);
	
	void deleteEmpresa(String idAuth0) throws Auth0Exception;
}
