package com.inventoMate.mapper.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.inventoMate.dtos.informes.DecisionDTO;
import com.inventoMate.dtos.informes.DecisionRequest;
import com.inventoMate.dtos.informes.DecisionResponse;
import com.inventoMate.dtos.users.UsuarioDTO;
import com.inventoMate.entities.Decision;
import com.inventoMate.entities.Informe;
import com.inventoMate.entities.Usuario;
import com.inventoMate.mapper.DecisionMapper;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Component
public class DecisionMapperImpl implements DecisionMapper {

	private final ModelMapper mapper;

	@Override
	public Decision mapToDecision(DecisionRequest decisionRequest, Informe informe, Usuario usuario) {
		return Decision.builder()
				.aceptado(decisionRequest.isAceptado())
				.justificacion(decisionRequest.getJustificacion())
				.informe(informe)
				.idEmpleado(usuario.getIdUsuario())
				.build();
	}

	@Override
	public DecisionResponse mapToDecisionResponse(Usuario usuario, Decision decision) {
		return DecisionResponse.builder()
				.decision(mapper.map(decision, DecisionDTO.class))
				.usuarioDecision(mapper.map(usuario, UsuarioDTO.class))
				.build();
	}
	
	
	
}
