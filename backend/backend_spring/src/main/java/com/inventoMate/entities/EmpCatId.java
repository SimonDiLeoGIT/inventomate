package com.inventoMate.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class EmpCatId{
	
	@Column(name="id_categoria", nullable = false)
	private Long idCategoria;
	@Column(name="id_empresa", nullable = false)
	private Long idEmpresa;

}
