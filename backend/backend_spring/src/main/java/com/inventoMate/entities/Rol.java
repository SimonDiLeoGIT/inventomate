package com.inventoMate.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ROLES")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rol {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_rol")
	private Long idRol;

	@Column(name = "nombre_rol", nullable = false)
	private String nombreRol;

	@Column(name = "descripcion", nullable = false)
	private String descripcion;
	
	@Column(name = "id_rol_auth0", nullable = false)
	private String idRolAuth0;

	@ManyToMany(mappedBy = "roles")
	private List<Usuario> usuarios;

}
