package com.inventoMate.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "CATEGORIA_MELI")
@Data
public class CategoriaMeli {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nombre;
	@Column(name = "id_meli")
	private String idMeli;
	@OneToMany(mappedBy = "categoriaMeli", cascade = CascadeType.ALL)
	private List<ProductoMeli> productos;
	
}
