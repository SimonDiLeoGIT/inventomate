package com.inventoMate.entities;

import java.time.LocalDateTime;
import java.util.List;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class InvitacionSucursal {

	@Column(name = "id_invitacion")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idInvitacion;
	
	private String token;
	
	@Column(name = "fecha_creacion")
	private LocalDateTime fechaCreacion;
	
	@Column(name = "fecha_expiracion")
	private LocalDateTime fechaExpiracion;
	
	@Column(name = "id_usuario_invitado")
	private Long idUsuarioInvitado;
	
	@Column(name = "id_sucursal")
	private Long idSucursal;
	
	@Column(name = "ids_roles")
	private List<Long> roles;
	
}
