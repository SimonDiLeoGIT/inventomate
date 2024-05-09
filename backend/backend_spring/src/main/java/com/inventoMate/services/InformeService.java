package com.inventoMate.services;

import java.time.LocalDate;
import java.util.List;

import com.inventoMate.dtos.informes.InformeDTO;
import com.inventoMate.entities.TipoInforme;

public interface InformeService {

	void informeDeTendencia(String idAuth0, Long idSucursal);

	void informeDeProyeccion(String subject, Long idSucursal, LocalDate fechaProyeccion);

	List<InformeDTO> getInformesByIdSucursalAndTipoInforme(String subject, Long idSucursal, TipoInforme proyeccionDeVentas);

	Object getInformeByIdInformeAndIdSucursal(String subject, Long idSucursal, Long idInforme);
	
}
