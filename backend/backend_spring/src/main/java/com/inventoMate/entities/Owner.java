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
@Table(name="OWNERs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Owner {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_empresas")
	private Long idEmpresa;
	
	@ManyToOne
    @JoinColumn(name = "id_empresa")
	private Empresa empresa;
	
	@ManyToOne
    @JoinColumn(name = "id_usuario")
	private Usuario usuario;

}
