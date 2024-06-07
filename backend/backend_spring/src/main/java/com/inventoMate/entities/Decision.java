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
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "DECISIONES")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Decision {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;	
	private boolean aceptado;
	@Column(length = 2000)
	private String justificacion;
	@Column(name = "id_empleado")
	private Long idEmpleado;
	@ManyToOne
	@JoinColumn(name = "id_informe")
	private Informe informe;
	
}
