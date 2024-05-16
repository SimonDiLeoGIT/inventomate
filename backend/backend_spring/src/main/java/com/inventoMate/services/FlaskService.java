package com.inventoMate.services;

import com.inventoMate.dtos.meli.TrendsDTO;
import com.inventoMate.entities.TipoInforme;

import net.minidev.json.JSONObject;

public interface FlaskService {

	String postDatosInformeTendencias(TrendsDTO trendsDTO);

	String postDatosInformeProyeccionDeVentas(JSONObject jsonObject);

	Object getDatosInformeByTipoInforme(String idMongo, TipoInforme tipoInforme);
}
