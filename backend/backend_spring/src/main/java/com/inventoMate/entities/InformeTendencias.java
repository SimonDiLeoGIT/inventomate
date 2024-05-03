package com.inventoMate.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.inventoMate.dtos.meli.TrendsDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Document(collection = "informe_tendencias")
@AllArgsConstructor
@Builder
@Data
public class InformeTendencias {

	@Id
	private String idMongo;
	private Long idRelacional;
	private TrendsDTO informe;
	
	
}
