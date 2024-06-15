package com.inventoMate.dtos.informes;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.inventoMate.dtos.users.UsuarioDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DecisionResponse {

	@JsonProperty("usuario_decision")
	private UsuarioDTO usuarioDecision;

	@JsonProperty("decision")
	private DecisionDTO decision;
}
