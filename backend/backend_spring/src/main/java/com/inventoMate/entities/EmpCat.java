package com.inventoMate.entities;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="EMPCATs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpCat {
	
	@EmbeddedId
	private EmpCatId id;
	
	@ManyToOne
	@MapsId("idCategoria")
	@JoinColumn(name="categoria")
	private Categoria categoria;
	
	@ManyToOne
	@MapsId("idEmpresa")
	@JoinColumn(name="empresa")
	private Empresa empresa;

}
