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
@Table(name="SUCURSALES")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Sucursal {

	@EmbeddedId
	private SucursalId id;
	
	@ManyToOne
	@MapsId("idEmpresa")
	@Column(name="empresa")
	private Empresa empresa;
	
	@ManyToOne
    @JoinColumn(name = "id_pais")
	@Column(name="pais")
    private Pais pais;
	
	@Column(name="nombre", nullable = true)
	private String nombre;
	
	@Column(name="ubicacion", nullable = true)
	private String ubicacion;
	
}
