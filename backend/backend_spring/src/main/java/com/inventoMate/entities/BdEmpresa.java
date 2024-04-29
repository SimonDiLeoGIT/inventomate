package com.inventoMate.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "BD_empresa")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BdEmpresa {

	@Id
	@Column(name = "id_bd_empresa")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idBdEmpresa;
	
	@Column(name = "gestor_bd", nullable = false)
	@Enumerated(EnumType.STRING)
	private TipoBd gestorBd;

	@Column(nullable = false)
	private String url;
	
	@Column(nullable = false)
	private String username;
	
	@Column(nullable = false)
	private String password;
	
	@OneToOne(mappedBy = "bdEmpresa")
	private Empresa empresa;
	
}
