package com.inventoMate.services;

import com.inventoMate.dtos.meli.TrendsDTO;

public interface InformeService {

	TrendsDTO informeDeTendencia(String idAuth0, Long idSucursal);
	
}
