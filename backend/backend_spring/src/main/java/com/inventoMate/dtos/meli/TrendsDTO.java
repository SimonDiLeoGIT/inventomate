package com.inventoMate.dtos.meli;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.JSONObject;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrendsDTO {

	private List<CategoryTrendDTO> trends;
	JSONObject historico;
	@JsonProperty("informacion_cliente")
	JSONObject informacionCliente;
}