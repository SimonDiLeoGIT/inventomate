package com.inventoMate.entities;

import java.time.LocalDate;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Order;

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

	@OneToMany(mappedBy = "sucursal", cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	private List<Usuario> usuarios;

	@OneToMany(mappedBy = "sucursal", cascade = CascadeType.ALL)
	private List<Informe> informes;

	@Transient
	private EmailSender emailSender;

	public boolean trabajaEmpleado(Usuario empleado) {
		return this.getUsuarios().contains(empleado);
	}

	public Usuario obtenerEmpleado(Long idEmpleado) {
		return this.getUsuarios().stream().filter(empleado -> empleado.getIdUsuario().equals(idEmpleado)).findFirst()
				.orElse(null);
	}

	public void eliminarEmpleados() {
		usuarios.forEach(empleado -> empleado.eliminarSucursal());
	}

	public boolean contieneEmpleados() {
		return getUsuarios() != null;
	}

	public List<Usuario> obtenerEmpleados() {
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
		empleado.asignarSucursal(this, roles);
	}

	public void eliminarEmpleado(Usuario empleado) {
		this.getUsuarios().remove(empleado);
		empleado.eliminarSucursal();
	}

	public void generarNotificacionDeInforme(Informe informe) {
		List<Usuario> empleados = obtenerEmpleadosConRol(informe.getTipoInforme().getRolePermission());
		empleados.forEach(empleado -> {
			emailSender.sendInformeNotification(this.empresa, this, informe, empleado);
		});
	}

	private List<Usuario> obtenerEmpleadosConRol(String roleName) {
		List<Usuario> empleadosConRol = getUsuarios().stream().filter(empleado -> empleado.tieneRol(roleName))
				.collect(Collectors.toList());
		empleadosConRol.add(empresa.getOwner());
		return empleadosConRol;
	}

	public void agregarInforme(Informe informe) {
		if (getInformes() == null)
			informes = new LinkedList<>();
		informes.add(informe);
		informe.setSucursal(this);
	}

	public Page<Informe> obtenerInformes(TipoInforme tipo, Pageable pageable, LocalDate startDate, LocalDate endDate,
			Boolean visto) {
		List<Informe> filteredInformes = getInformes().stream().filter(informe -> informe.getTipoInforme().equals(tipo))
				.filter(informe -> (startDate == null || !informe.getFecha().isBefore(startDate)))
				.filter(informe -> (endDate == null || !informe.getFecha().isAfter(endDate)))
				.filter(informe -> (visto == null || informe.isVisto() == visto))
				.collect(Collectors.toList());

		boolean ascending = pageable.getSort().stream().filter(order -> order.getProperty().equals("fecha")).findFirst()
				.map(Order::isAscending).orElse(true);

		filteredInformes.sort((i1, i2) -> ascending ? i1.getId().compareTo(i2.getId())
				: i2.getId().compareTo(i1.getId()));

		int start = (int) pageable.getOffset();
		int end = Math.min((start + pageable.getPageSize()), filteredInformes.size());

		return new PageImpl<>(filteredInformes.subList(start, end), pageable, filteredInformes.size());
	}

	public Informe obtenerInforme(Long idInforme) {
		return getInformes().stream().filter(informe -> informe.getId().equals(idInforme)).findFirst().orElse(null);
	}

	public Informe borrarInforme(Long idInforme) {
		var informe = obtenerInforme(idInforme);
		return informes.remove(informe) ? informe : null;
	}

	public void generarNotificacionDeInforme(Informe informe, Usuario empleado) {
		emailSender.sendDecisionNotification(this.empresa, this, informe, empleado, this.empresa.getOwner());
	}

	public List<Informe> obtenerInformesConDecisiones() {
		return informes.stream().filter(informe -> informe.tieneDecisiones()).collect(Collectors.toList());
	}
}
