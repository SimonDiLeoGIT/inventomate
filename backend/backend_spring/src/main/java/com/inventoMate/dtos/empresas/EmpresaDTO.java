package com.inventoMate.dtos.empresas;

import java.util.List;

import com.inventoMate.dtos.sucursales.SucursalDTO;
import com.inventoMate.dtos.users.OwnerDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmpresaDTO {

	@Null
	private Long idEmpresa;
	
	@NotBlank
	@Size(min = 3, message = "el nombre debe contener al menos 3 caracteres")
	private String nombreEmpresa;

	@Size(max = 25, message = "la descripcion no debe ser mayor a 25 caracteres")
	private String descripcion;

	private String logo;
	
	@Null
	private List<SucursalDTO> sucursales;
	
	@Null
    private OwnerDTO owner;
	
}
