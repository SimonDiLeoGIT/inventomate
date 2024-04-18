package com.inventoMate.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "SUCURSALES")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Sucursal {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_sucursal")
	private Long idSucursal;

	@ManyToOne
	@JoinColumn(name = "id_empresa")
	private Empresa empresa;

	@Column(name = "nombre", nullable = false)
	private String nombre;

	@Column(name = "ubicacion", nullable = false)
	private String ubicacion;

	@Column(name = "id_suc_cliente", nullable = true)
	private String idSucCliente;

	@OneToMany(mappedBy = "sucursal", cascade = CascadeType.ALL)
	private List<Usuario> usuarios;
	
}
