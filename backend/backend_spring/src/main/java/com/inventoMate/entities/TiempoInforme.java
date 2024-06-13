package com.inventoMate.entities;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "TIEMPOS_INFORMES")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TiempoInforme {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@OneToOne
	@JoinColumn(name = "id_informe")
	private Informe informe;
	@Column(name = "tipo_informe")
	@Enumerated(EnumType.STRING)
	private TipoInforme tipoInforme;
	private LocalDate fecha;
	@Column(name = "tiempo_inicio")
	private LocalTime tiempoInicio;
	@Column(name = "tiempo_fin")
	private LocalTime tiempoFin;
	@Column(name = "duracion_segundos")
	private Long duracionSegundos;
}
