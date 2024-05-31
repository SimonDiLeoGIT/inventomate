package com.inventoMate.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "PRODUCTOS_MELI")
@Data
public class ProductoMeli {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "id_meli")
	private String idMeli;
	@Column(name = "trend_position")
	private Integer trendPosition;
	private LocalDate fecha;
	@ManyToOne
	@JoinColumn(name = "id_categoria")
	private CategoriaMeli categoriaMeli;
	
}
