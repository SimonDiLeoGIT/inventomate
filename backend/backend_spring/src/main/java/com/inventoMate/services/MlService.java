package com.inventoMate.services;

import java.util.List;
import java.util.Map;

import com.inventoMate.dtos.bdEmpresas.tablas.ProductoSucursalInfo;
import com.inventoMate.dtos.meli.CategoryTrendDTO;
import com.inventoMate.dtos.meli.TrendsDTO;
import com.inventoMate.entities.CategoriaMeli;

public interface MlService {

	TrendsDTO getTendencias(List<ProductoSucursalInfo> products);

	Map<String, String> refreshToken();

	List<CategoriaMeli> getHistorico(List<CategoryTrendDTO> trends);

}
