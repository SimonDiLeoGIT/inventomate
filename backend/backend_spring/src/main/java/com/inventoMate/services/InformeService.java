package com.inventoMate.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.inventoMate.dtos.informes.DecisionRequest;
import com.inventoMate.dtos.informes.DecisionResponse;
import com.inventoMate.dtos.informes.InformeDTO;
import com.inventoMate.entities.TipoInforme;

public interface InformeService {

	void informeDeTendencia(String idAuth0, Long idSucursal);

	void informeDeProyeccion(String subject, Long idSucursal, LocalDate fechaProyeccion);

	void informeDeSiguientesPedidos(String subject, Long idSucursal);

	void informeDeObsolescencia(String subject, Long idSucursal);

	void deleteInformeByIdInformeAndIdSucursal(String subject, Long idSucursal, Long idInforme,
			TipoInforme tipoInforme);

	Object getInformeByIdInformeAndIdSucursal(String subject, Long idSucursal, Long idInforme, TipoInforme tipoInforme);

	void informeDeDecision(String subject, Long idInforme, Long idSucursal, DecisionRequest decision);

	List<InformeDTO> getInformesConDecisiones(String subject, Long idSucursal);

	List<DecisionResponse> getDecisionesDelInforme(String subject, Long idSucursal, Long idInforme);

	void deleteDecisionDelInforme(String subject, Long idSucursal, Long idInforme, Long idDecision);

	Page<InformeDTO> getInformesByIdSucursalAndTipoInforme(String subject, Long idSucursal, TipoInforme tipoInforme,
			Pageable pageable, LocalDate desde, LocalDate hasta, Boolean visto);

}
