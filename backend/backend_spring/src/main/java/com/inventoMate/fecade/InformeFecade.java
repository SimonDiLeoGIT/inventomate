package com.inventoMate.fecade;

import com.inventoMate.dtos.meli.TrendsDTO;

public interface InformeFecade {

	TrendsDTO informeDeTendencia(String idAuth0, Long idSucursal);
	
}
