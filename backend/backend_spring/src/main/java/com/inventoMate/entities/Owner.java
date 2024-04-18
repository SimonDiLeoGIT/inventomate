/*package com.inventoMate.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "OWNERs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Owner {

	@JoinColumn(name = "id_empresa")
	private Empresa empresa;

	@Id
	@JoinColumn(name = "id_usuario")
	private Usuario usuario;

}
*/