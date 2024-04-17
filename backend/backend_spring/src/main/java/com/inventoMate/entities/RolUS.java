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
@Table(name="ROLUSs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RolUS {
	
	@EmbeddedId
	private RolUSId id;
	
	@ManyToOne
	@MapsId("idRol")
	@JoinColumn(name="rol")
	private Rol rol;
	
	@ManyToOne
	@MapsId("idUsuario")
	@JoinColumn(name="usuario")
	private Usuario usuario;

}
