package com.inventoMate.dtos.informes;

import java.time.LocalDate;

import com.inventoMate.entities.TipoInforme;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class InformeDTO {

	private Long id;
	private LocalDate fecha;
	private String idMongo;
	private TipoInforme tipoInforme;
	private boolean visto;

}
