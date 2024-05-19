package com.inventoMate.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.inventoMate.dtos.meli.TrendsDTO;

import net.minidev.json.JSONObject;

@FeignClient(name = "flaskClient", url = "${flask.url.base}")
public interface FlaskClient {

	@PostMapping("${flask.url.proyeccion-de-ventas-add}")
	JSONObject postDatosInformeProyeccionDeVentas(@RequestBody JSONObject jsonObject);

	@GetMapping("${flask.url.proyeccion-de-ventas}")
	Object getDatosInformeDeProyeccionDeVentas(@RequestParam("idMongo") String idMongo);

	@PostMapping("${flask.url.sugerencias-pedidos-add}")
	JSONObject postDatosInformeSiguientesPedidos(@RequestBody JSONObject jsonObject);

	@GetMapping("${flask.url.sugerencias-pedidos}")
	Object getDatosInformeSiguientesPedidos(@RequestParam("idMongo") String idMongo);

	@PostMapping("${flask.url.tendencias-add}")
	JSONObject postDatosInformeTendencias(@RequestBody TrendsDTO trendsDTO);

	@GetMapping("${flask.url.tendencias}")
	Object getDatosInformeTendencias(@RequestParam("idMongo") String idMongo);
}
