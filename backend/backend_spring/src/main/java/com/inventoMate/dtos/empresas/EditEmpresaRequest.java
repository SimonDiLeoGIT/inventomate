package com.inventoMate.dtos.empresas;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EditEmpresaRequest {

	@Size(min = 3, max = 25, message = "El nombre de la empresa debe tener entre 3 y 25 caracteres")
	private String nombreEmpresa;

	@Size(max = 100, message = "La descripción debe tener como máximo 100 caracteres")
	private String descripcion;

	private String logo;

}
