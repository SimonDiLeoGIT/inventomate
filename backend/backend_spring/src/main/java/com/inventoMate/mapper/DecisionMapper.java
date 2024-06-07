package com.inventoMate.mapper;

import com.inventoMate.dtos.informes.DecisionRequest;
import com.inventoMate.dtos.informes.DecisionResponse;
import com.inventoMate.entities.Decision;
import com.inventoMate.entities.Informe;
import com.inventoMate.entities.Usuario;

public interface DecisionMapper {

	Decision mapToDecision(DecisionRequest decisionRequest, Informe informe, Usuario usuario);

	DecisionResponse mapToDecisionResponse(Usuario orElse, Decision decision);

}
