package com.inventoMate.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
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

	/*
	 * @EmbeddedId private SucursalId id;
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_sucursal")
	private Long idSucursal;

	@ManyToOne
	@JoinColumn(name = "id_empresa")
	private Empresa empresa;

	/*
	 * @ManyToOne
	 * 
	 * @JoinColumn(name = "id_pais") 
	 * private Pais pais;
	 */

	@Column(name = "nombre", nullable = true)
	private String nombre;

	@Column(name = "ubicacion", nullable = true)
	private String ubicacion;

	@Column(name = "id_suc_cliente", nullable = true)
	private String idSucCliente;

	@OneToMany(mappedBy = "sucursal", cascade = CascadeType.ALL)
	private List<Usuario> usuarios;
}
