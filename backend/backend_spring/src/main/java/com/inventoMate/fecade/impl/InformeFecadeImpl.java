package com.inventoMate.fecade.impl;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.inventoMate.dtos.meli.TrendsDTO;
import com.inventoMate.fecade.InformeFecade;
import com.inventoMate.services.FlaskService;
import com.inventoMate.services.InformeTendenciaService;
import com.inventoMate.services.MlService;
import com.inventoMate.services.SucursalService;
import com.inventoMate.services.UsuarioConnectionDatabaseService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class InformeFecadeImpl implements InformeFecade {

	private final UsuarioConnectionDatabaseService connectionDatabaseService;
	private final InformeTendenciaService informeTendenciaService;
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
		List<String> products = informeTendenciaService.execute(template, idSucursalCliente);
		// obtengo el json del procesado en la api de meli
		var responseMeli = mlService.getTendencias(products);
		// lo paso a la api de flask para el procesado en python
		//var response = flaskService.postDatosInformeTendencias(responseMeli);
		// guardo el informe en la bd de mongo o mando notificaciones
		return responseMeli;
	}
	
}
