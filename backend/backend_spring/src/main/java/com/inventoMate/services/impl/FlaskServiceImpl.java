package com.inventoMate.services.impl;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
			break;
		case OBSOLESCENCIA:
			response = getDatosInformeObsolescencia(idMongo);
			break;
		}
		return response;
	}

	@Override
	public HttpStatusCode deleteInformeByIdAndTipoInforme(String idMongo, TipoInforme tipoInforme) {
		HttpStatusCode response = HttpStatus.BAD_REQUEST;
		switch (tipoInforme) {
		case ANALISIS_DE_TENDENCIA:
			response = deleteDatosInformeTendencias(idMongo);
			break;
		case PROYECCION_DE_VENTAS:
			response = deleteDatosInformeDeProyeccionDeVentas(idMongo);
			break;
		case SIGUIENTES_PEDIDOS:
			response = deleteDatosInformeSiguientesPedidos(idMongo);
			break;
		case OBSOLESCENCIA:
			response = deleteDatosInformeObsolescencia(idMongo);
			break;
		}
		return response;
	}

	// proyeccion de ventas
	@Override
	public String postDatosInformeProyeccionDeVentas(JSONObject jsonObject) {
		return flaskServiceFeignClient.postDatosInformeProyeccionDeVentas(jsonObject).get("ID-Mongo").toString();
	}

	private Object getDatosInformeDeProyeccionDeVentas(String idMongo) {
		return flaskServiceFeignClient.getDatosInformeDeProyeccionDeVentas(idMongo);
	}
	
	private HttpStatusCode deleteDatosInformeDeProyeccionDeVentas(String idMongo) {
		return flaskServiceFeignClient.deleteInformeDeProyeccionDeVentas(idMongo).getStatusCode();
	}
	
	// siguientes pedidos
	@Override
	public String postDatosInformeSiguientesPedidos(JSONObject jsonObject) {
		return flaskServiceFeignClient.postDatosInformeSiguientesPedidos(jsonObject).get("ID-Mongo").toString();
	}

	private Object getDatosInformeSiguientesPedidos(String idMongo) {
		return flaskServiceFeignClient.getDatosInformeSiguientesPedidos(idMongo);
	}
	
	private HttpStatusCode deleteDatosInformeSiguientesPedidos(String idMongo) {
		return flaskServiceFeignClient.deleteInformeSiguientesPedidos(idMongo).getStatusCode();
	}

	// informe tendencias
	@Override
	public String postDatosInformeTendencias(TrendsDTO trendsDTO) {
		return flaskServiceFeignClient.postDatosInformeTendencias(trendsDTO).get("ID-Mongo").toString();
	}

	private Object getDatosInformeTendencias(String idMongo) {
		return flaskServiceFeignClient.getDatosInformeTendencias(idMongo);
	}
	
	private HttpStatusCode deleteDatosInformeTendencias(String idMongo) {
		return flaskServiceFeignClient.deleteInformeTendencias(idMongo).getStatusCode();
	}

	// informe obsolescencia
	@Override
	public String postDatosInformeObsolescencia(JSONObject productoInformation) {
		return flaskServiceFeignClient.postDatosInformeObsolescencia(productoInformation).get("ID-Mongo").toString();
	}
	
	private HttpStatusCode deleteDatosInformeObsolescencia(String idMongo) {
		return flaskServiceFeignClient.deleteInformeObsolescencia(idMongo).getStatusCode();
	}
	
	private Object getDatosInformeObsolescencia(String idMongo) {
		return flaskServiceFeignClient.getDatosInformeObsolescencia(idMongo);
	}
}
