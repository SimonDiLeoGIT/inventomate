package com.inventoMate.entities;

import java.util.ArrayList;
import java.util.Collections;
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
    @JoinColumn(name = "owner")
    private Usuario owner;
	
	@OneToOne
    @JoinColumn(name = "id_bd_empresa")
    private BdEmpresa bdEmpresa;
	
	public Sucursal obtenerSucursal(Long idSucursal) {
		return this.getSucursales().stream()
				.filter(sucursal -> sucursal.getIdSucursal().equals(idSucursal))
				.findFirst().orElse(null);
	}

	public void inicializarEmpresa(Usuario usuario) {
		this.setOwner(usuario);
		this.setSucursales(Collections.emptyList());
	}

	public void eliminarSucursales() {
		sucursales.forEach(sucursal -> sucursal.eliminarEmpleados());
	}
	
	public List<Usuario> obtenerEmpleados() {
	    List<Usuario> empleados = new ArrayList<>();
	    sucursales.stream()
	              .filter(Sucursal::contieneEmpleados)
	              .map(Sucursal::obtenerEmpleados)
	              .forEach(empleados::addAll);
	    return empleados;
	}
	
}
