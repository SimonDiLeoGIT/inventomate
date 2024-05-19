package com.inventoMate.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.inventoMate.dtos.meli.TrendsDTO;

import net.minidev.json.JSONObject;

@FeignClient(name = "flaskService", url = "http://127.0.0.1:5000/api/informe")
public interface FlaskServiceFeignClient {

	@PostMapping("/proyeccion-de-ventas/add")
	JSONObject postDatosInformeProyeccionDeVentas(@RequestBody JSONObject jsonObject);

	@GetMapping("/proyeccion-de-ventas")
	Object getDatosInformeDeProyeccionDeVentas(@RequestParam("idMongo") String idMongo);

	@PostMapping("/sugerencias-pedidos/add")
	JSONObject postDatosInformeSiguientesPedidos(@RequestBody JSONObject jsonObject);

	@GetMapping("/sugerencias-pedidos")
	Object getDatosInformeSiguientesPedidos(@RequestParam("idMongo") String idMongo);

	@PostMapping("/tendencias/add")
	JSONObject postDatosInformeTendencias(@RequestBody TrendsDTO trendsDTO);

	@GetMapping("/tendencias")
	Object getDatosInformeTendencias(@RequestParam("idMongo") String idMongo);
}