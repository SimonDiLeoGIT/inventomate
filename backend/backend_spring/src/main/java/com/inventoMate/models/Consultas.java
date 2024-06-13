package com.inventoMate.models;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;

import com.inventoMate.dtos.bdEmpresas.tablas.CategoriaGanancia;
import com.inventoMate.dtos.bdEmpresas.tablas.CategoriaRangoPrecios;
import com.inventoMate.dtos.bdEmpresas.tablas.CompraDetalle;
import com.inventoMate.dtos.bdEmpresas.tablas.ProductoSucursalInfo;
import com.inventoMate.dtos.bdEmpresas.tablas.VentaDetalle;

public interface Consultas {

	List<String> listProductsByIdSucursal(JdbcTemplate jdbcTemplate, Long idSucursal);

	List<VentaDetalle> gethistoricoDeVentasByIdSucursal(JdbcTemplate jdbcTemplate, Long idSucursal);

	List<CompraDetalle> getHistoricoDeComprasByIdSucursal(JdbcTemplate jdbcTemplate, Long idSucursal);

	List<ProductoSucursalInfo> getProductInformationByIdSucursal(JdbcTemplate jdbcTemplate, Long idSucCliente);
	
	List<CategoriaGanancia> getProductoPorcentajeGanancia(JdbcTemplate jdbcTemplate, Long idSucCliente);
	
	List<CategoriaRangoPrecios> getRangoPreciosPorCategoria(JdbcTemplate jdbcTemplate, Long idSucCliente);
}
