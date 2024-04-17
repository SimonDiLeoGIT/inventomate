package com.inventoMate.entities;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
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
@Table(name="USs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class US {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_usuarios")
	private Long idUsuario;
	
	@ManyToOne
    @JoinColumn(name = "id_usuario")
	private Usuario usuario;
	
	@ManyToOne
    @JoinColumn(name = "id_sucursal")
	@JoinColumn(name="id_empresa")
	private Sucursal sucursal;

}
