package com.inventoMate.services.impl;

import org.springframework.stereotype.Service;
import com.inventoMate.dtos.meli.TrendsDTO;
import com.inventoMate.entities.TipoInforme;
import com.inventoMate.feign.FlaskClient;
import com.inventoMate.services.FlaskService;

import lombok.AllArgsConstructor;
import net.minidev.json.JSONObject;

@Service
@AllArgsConstructor
public class FlaskServiceImpl implements FlaskService {

	private final FlaskClient flaskServiceFeignClient;

	@Override
	public Object getDatosInformeByTipoInforme(String idMongo, TipoInforme tipoInforme) {
		Object response = null;
		switch (tipoInforme) {
		case ANALISIS_DE_TENDENCIA:
			response = getDatosInformeTendencias(idMongo);
			break;
		case PROYECCION_DE_VENTAS:
			response = getDatosInformeDeProyeccionDeVentas(idMongo);
			break;
		case SIGUIENTES_PEDIDOS:
			response = getDatosInformeSiguientesPedidos(idMongo);
		}
		return response;
	}

	@Override
	public String postDatosInformeProyeccionDeVentas(JSONObject jsonObject) {
		return flaskServiceFeignClient.postDatosInformeProyeccionDeVentas(jsonObject).get("ID-Mongo").toString();
	}

	private Object getDatosInformeDeProyeccionDeVentas(String idMongo) {
		return flaskServiceFeignClient.getDatosInformeDeProyeccionDeVentas(idMongo);
	}

	@Override
	public String postDatosInformeSiguientesPedidos(JSONObject jsonObject) {
		return flaskServiceFeignClient.postDatosInformeSiguientesPedidos(jsonObject).get("ID-Mongo").toString();
	}

	private Object getDatosInformeSiguientesPedidos(String idMongo) {
		return flaskServiceFeignClient.getDatosInformeSiguientesPedidos(idMongo);
	}

	@Override
	public String postDatosInformeTendencias(TrendsDTO trendsDTO) {
		return flaskServiceFeignClient.postDatosInformeTendencias(trendsDTO).get("ID-Mongo").toString();
	}

	private Object getDatosInformeTendencias(String idMongo) {
		return flaskServiceFeignClient.getDatosInformeTendencias(idMongo);
	}
}
