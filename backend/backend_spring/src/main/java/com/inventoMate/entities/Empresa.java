package com.inventoMate.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "EMPRESAS")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Empresa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_empresa")
	private Long idEmpresa;

	@Column(name = "nombreEmpresa", nullable = false)
	private String nombreEmpresa;

	@Column(name = "descripcion", nullable = true)
	private String descripcion;

	@Column(name = "logo", nullable = true)
	private String logo;
	
	@OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL)
	private List<Sucursal> sucursales;
	
	@OneToOne
    @JoinColumn(name = "idOwner")
    private Usuario idOwner;
}
