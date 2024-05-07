package com.inventoMate.entities;

import java.util.Collections;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "USUARIOS")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_usuario")
	private Long idUsuario;

	@Column(name = "id_auth0", nullable = false)
	private String idAuth0;

	@Column(name = "nickname", nullable = true)
	private String nickname;

	@Column(name = "email", nullable = false)
	private String email;

	@Column(nullable = true)
	private String picture;
	
	@ManyToOne
	@JoinColumn(name = "id_sucursal", nullable = true)
	private Sucursal sucursal;

	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "usuario_rol", joinColumns = @JoinColumn(name = "id_usuario"), inverseJoinColumns = @JoinColumn(name = "id_rol"))
	private List<Rol> roles;

	@OneToOne(mappedBy = "owner", cascade = CascadeType.ALL)
	private Empresa empresa;

	public boolean esDueñoDeEmpresa() {
		return this.getEmpresa() != null;
	}

	public boolean trabajaEnSucursal() {
		return this.getSucursal() != null;
	}

	public void crearEmpresa(Empresa empresa, Rol rol) {
		this.setEmpresa(empresa);
		this.agregarRol(rol);
		empresa.inicializarEmpresa(this);
	}
	
	public Empresa obtenerEmpresa() {
		return esDueñoDeEmpresa()? getEmpresa() :
			sucursal.getEmpresa();
	}

	public void eliminarEmpresa() {
		empresa.eliminarSucursales();
		this.setEmpresa(null);
		revocarRoles();
	}
	
	public void eliminarSucursal() {
		revocarRoles();
		this.setSucursal(null);
	}

	public void revocarRoles() {
		setRoles(Collections.emptyList());
	}
	
	public void agregarRol(Rol rol) {
		if(getRoles() == null) {
			roles = Collections.emptyList();
		}
		roles.add(rol);
	}

	public void agregarRoles(List<Rol> roles) {
		roles.forEach(this::agregarRol);
	}

	public void asignarSucursal(Sucursal sucursal, List<Rol> roles) {
		this.sucursal = sucursal;
		agregarRoles(roles);
	}

	public void actualizarRoles(List<Rol> roles) {
		this.setRoles(roles);
	}
}
