package com.inventoMate.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.inventoMate.dtos.meli.TrendsDTO;

import net.minidev.json.JSONObject;

@FeignClient(name = "flaskClient", url = "${flask.url.base}")
public interface FlaskClient {

	// proyeccion de ventas
	@PostMapping("${flask.url.proyeccion-de-ventas-add}")
	JSONObject postDatosInformeProyeccionDeVentas(@RequestBody JSONObject jsonObject);

	@GetMapping("${flask.url.proyeccion-de-ventas}")
	Object getDatosInformeDeProyeccionDeVentas(@RequestParam("idMongo") String idMongo);

	@DeleteMapping("${flask.url.proyeccion-de-ventas-delete}")
	ResponseEntity<?> deleteInformeDeProyeccionDeVentas(@RequestParam("idMongo") String idMongo);

	// siguientes pedidos
	@PostMapping("${flask.url.sugerencias-pedidos-add}")
	JSONObject postDatosInformeSiguientesPedidos(@RequestBody JSONObject jsonObject);

	@GetMapping("${flask.url.sugerencias-pedidos}")
	Object getDatosInformeSiguientesPedidos(@RequestParam("idMongo") String idMongo);

	@DeleteMapping("${flask.url.sugerencias-pedidos-delete}")
	ResponseEntity<?> deleteInformeSiguientesPedidos(@RequestParam("idMongo") String idMongo);

	// tendencias
	@PostMapping("${flask.url.tendencias-add}")
	JSONObject postDatosInformeTendencias(@RequestBody TrendsDTO trendsDTO);

	@GetMapping("${flask.url.tendencias}")
	Object getDatosInformeTendencias(@RequestParam("idMongo") String idMongo);

	@DeleteMapping("${flask.url.tendencias-delete}")
	ResponseEntity<?> deleteInformeTendencias(@RequestParam("idMongo") String idMongo);

	// obsolescencia
	@PostMapping("${flask.url.obsolescencia-add}")
	JSONObject postDatosInformeObsolescencia(@RequestBody JSONObject productoInformation);

	@DeleteMapping("${flask.url.obsolescencia-delete}")
	ResponseEntity<?> deleteInformeObsolescencia(@RequestParam("idMongo") String idMongo);

	@GetMapping("${flask.url.obsolescencia}")
	Object getDatosInformeObsolescencia(@RequestParam("idMongo") String idMongo);
}
