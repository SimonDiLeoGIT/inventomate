package com.inventoMate.entities;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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

	@OneToMany(mappedBy = "informe", cascade = CascadeType.ALL)
	private List<Decision> decisiones;

	@OneToMany(mappedBy = "informe", cascade = CascadeType.ALL)
	private List<Valoracion> valoraciones;

	private boolean visto;

	public void agregarDecision(Decision decision) {
		if (decisiones == null) {
			decisiones = new LinkedList<Decision>();
		}
		decisiones.add(decision);
	}

	public boolean tieneDecisiones() {
		return decisiones.size() > 0;
	}

	public Decision eliminarDecision(Long idDecision) {
		Decision decisionEliminar = decisiones.stream().filter(decision -> decision.getId().equals(idDecision))
				.findFirst().orElse(null);
		if (decisionEliminar != null)
			decisiones.remove(decisionEliminar);
		return decisionEliminar;
	}

	public void agregarValoracion(Valoracion valoracion) {
		if (valoraciones == null) {
			valoraciones = new LinkedList<Valoracion>();
		}
		valoraciones.add(valoracion);
	}
}
