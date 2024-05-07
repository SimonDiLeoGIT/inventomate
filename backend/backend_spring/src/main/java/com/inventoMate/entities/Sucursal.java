package com.inventoMate.entities;

import java.util.Collections;
import java.util.List;

import com.inventoMate.models.EmailSender;

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
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "SUCURSALES")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
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
	private Long idSucCliente;

	@OneToMany(mappedBy = "sucursal", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	private List<Usuario> usuarios;
	
	@Transient
    private EmailSender emailSender;
	
	public boolean trabajaEmpleado(Usuario empleado) {
		return this.getUsuarios().contains(empleado);
	}

	public Usuario obtenerEmpleado(Long idEmpleado) {
		return this.getUsuarios().stream()
				.filter(empleado -> empleado.getIdUsuario().equals(idEmpleado))
				.findFirst().orElse(null);
	}

	public void eliminarEmpleados() {
		usuarios.forEach(empleado -> empleado.eliminarSucursal());
	}

	public boolean contieneEmpleados() {
		return getUsuarios() != null;
	}
	
	public List<Usuario> obtenerEmpleados(){
		return this.getUsuarios();
	}

	public void inicializarSucursal(Empresa empresa) {
		this.setEmpresa(empresa);
		this.usuarios = Collections.emptyList();
	}
	
	public void enviarInvitacion(Usuario usuario, List<Rol> roles, String token) {
		emailSender.sendSucursalInvitation(this.getEmpresa(), this, usuario, roles, token);
	}

	public void agregarEmpleado(Usuario empleado, List<Rol> roles) {
		this.getUsuarios().add(empleado);
		empleado.asignarSucursal(this,roles);
	}

	public void eliminarEmpleado(Usuario empleado) {
		this.getUsuarios().remove(empleado);
		empleado.eliminarSucursal();
	}
	
	
}
