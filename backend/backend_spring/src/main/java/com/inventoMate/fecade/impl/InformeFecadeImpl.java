package com.inventoMate.fecade.impl;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.inventoMate.fecade.InformeFecade;
import com.inventoMate.services.InformeTendenciaService;
import com.inventoMate.services.SucursalService;
import com.inventoMate.services.UsuarioConnectionDatabaseService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class InformeFecadeImpl implements InformeFecade {

	private final UsuarioConnectionDatabaseService connectionDatabaseService;
	private final InformeTendenciaService informeTendenciaService;
	private final SucursalService sucursalService;

	@Override
	public List<String> informeDeTendencia(String idAuth0, Long idSucursal) {
		JdbcTemplate template = connectionDatabaseService.getJdbcTemplateForUser(idAuth0);
		var idSucursalCliente = sucursalService.getSucursalProfile(idAuth0, idSucursal).getSucursal().getIdSucCliente();
		return informeTendenciaService.execute(template, idSucursalCliente);
	}
	
}
