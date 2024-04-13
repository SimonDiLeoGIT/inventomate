package com.inventoMate.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="INFORMES")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Informe {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_informe")
	private Long idInforme;
	
	@Column(name="json", nullable = true)
	private String json;
	
	@ManyToOne
	@JoinColumn(name="id_categoria")
	@Column(name="categoria", nullable = false)
	private Categoria categoria;
	
	@ManyToOne
	@JoinColumn(name="id_sucursal")
	@Column(name="sucursal", nullable = false)
	private Sucursal sucursal;
	
	@ManyToOne
	@JoinColumn(name="id_empresa")
	@Column(name="empresa", nullable = false)
	private Sucursal empresa;
	
	@ManyToOne
	@JoinColumn(name="id_tipo_informe")
	@Column(name="tipo_informe", nullable = false)
	private TipoInforme tipoInforme;
}
