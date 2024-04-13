package com.inventoMate.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="EMPRESAS")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Empresa {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_empresa")
    private Long idEmpresa;
	
	@Column(name="nombreEmpresa", nullable = true)
    private String nombreEmpresa;
	
	@Column(name="descripcion", nullable = true)
    private String descripcion;
	
	@Column(name="logo", nullable = true)
    private String logo;
	
	@Column(name="id_Bd_Empresa", nullable = false)
    private Long idBdEmpresa;
	
	@Column(name="username_Bd_Empresa", nullable = true)
    private String usernameBdEmpresa;
	
	@Column(name="gestor_Bd_Empresa", nullable = true)
    private String gestorBdEmpresa;
	
	@Column(name="password_Bd_Empresa", nullable = false)
    private String passwordBdEmpresa;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;
    
}
