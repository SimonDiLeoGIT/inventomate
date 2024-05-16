package com.inventoMate.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Informe {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "id_mongo")
	private String idMongo;
	@Column(name = "fecha_creacion")
	private LocalDate fecha;

	@Enumerated(EnumType.STRING)
	private TipoInforme tipoInforme;

	@ManyToOne
	@JoinColumn(name = "id_sucursal", nullable = true)
	private Sucursal sucursal;

	private boolean visto;
}
