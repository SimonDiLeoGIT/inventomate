package com.inventoMate.fecade.impl;

import java.util.List;

import org.springframework.boot.autoconfigure.web.servlet.WebMvcProperties.Async;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.inventoMate.dtos.meli.TrendsDTO;
import com.inventoMate.fecade.InformeFecade;
import com.inventoMate.services.ClientDataBaseDAO;
import com.inventoMate.services.FlaskService;
import com.inventoMate.services.MlService;
import com.inventoMate.services.SucursalService;
import com.inventoMate.services.UsuarioConnectionDatabaseService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class InformeFecadeImpl implements InformeFecade {

	private final UsuarioConnectionDatabaseService connectionDatabaseService;
	private final ClientDataBaseDAO clientDataBaseDAO;
	private final SucursalService sucursalService;
	private final MlService mlService;
	private final FlaskService flaskService;
	
	@Override
	public TrendsDTO informeDeTendencia(String idAuth0, Long idSucursal) {
		// hago la conexion la bd del cliente
		JdbcTemplate template = connectionDatabaseService.getJdbcTemplateForUser(idAuth0);
		// obtengo el id de la sucursal del cliente
		var idSucursalCliente = sucursalService.getSucursalProfile(idAuth0, idSucursal).getSucursal().getIdSucCliente();
		// obtengo la lista de productos del la bd del cliente en la sucursal con id (idSucursal)
		List<String> products = clientDataBaseDAO.listProductsByIdSucursal(template, idSucursalCliente);
		// obtengo el json del procesado en la api de meli
		var responseMeli = mlService.getTendencias(products);
		// guardo el informe en la bd de mongo y mando notificaciones
		
		return responseMeli;
	}
	
}
