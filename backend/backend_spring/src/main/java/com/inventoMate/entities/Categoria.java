/*package com.inventoMate.entities;

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
@Table(name="CATEGORIAS")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Categoria {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_categoria")
	private Long idCategoria;
	@Column(name="id_meli", nullable = true)
	private Long idMeli;
	@Column(name="nombre", nullable = true)
	private String nombre;
	
}
*/