package com.inventoMate.mapper;

import java.time.LocalDate;
import java.util.List;

import com.inventoMate.dtos.bdEmpresas.tablas.CompraDetalle;
import com.inventoMate.dtos.bdEmpresas.tablas.VentaDetalle;
import com.inventoMate.dtos.informes.InformeDTO;
import com.inventoMate.entities.Informe;
import com.inventoMate.entities.TipoInforme;

import net.minidev.json.JSONObject;

public interface InformeMapper {

	JSONObject mapToHistoricoVentas(List<VentaDetalle> historicoVentas);
	JSONObject mapToHistoricoCompras(List<CompraDetalle> historicoCompras);
	JSONObject mapToHistoricoMovimientos(List<VentaDetalle> historicoVentas, List<CompraDetalle> historicoCompras,
			LocalDate fecha, Long idSucursal);
	List<InformeDTO> mapToInformeDTO(List<Informe> informes);
	InformeDTO mapToInformeDTO(Informe informe);
	Informe mapToInforme(String idMongo, TipoInforme tipo);

}
