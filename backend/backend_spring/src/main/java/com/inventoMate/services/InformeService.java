package com.inventoMate.services;

import java.time.LocalDate;
import java.util.List;

import com.inventoMate.dtos.informes.InformeDTO;
import com.inventoMate.entities.TipoInforme;

public interface InformeService {

	void informeDeTendencia(String idAuth0, Long idSucursal);

	void informeDeProyeccion(String subject, Long idSucursal, LocalDate fechaProyeccion);

	void informeDeSiguientesPedidos(String subject, Long idSucursal);
	
	void informeDeObsolescencia(String subject, Long idSucursal);

	List<InformeDTO> getInformesByIdSucursalAndTipoInforme(String subject, Long idSucursal,
			TipoInforme proyeccionDeVentas);

	void deleteInformeByIdInformeAndIdSucursal(String subject, Long idSucursal, Long idInforme,
			TipoInforme tipoInforme);

	Object getInformeByIdInformeAndIdSucursal(String subject, Long idSucursal, Long idInforme, TipoInforme tipoInforme);

}
