package com.inventoMate.dtos.bdEmpresas;

import com.inventoMate.entities.TipoBd;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BdEmpresaDTO {

	private Long id;
	
	private TipoBd gestorBd;

	private String url;
	
	private String username;
	
	private String password;
	
}
