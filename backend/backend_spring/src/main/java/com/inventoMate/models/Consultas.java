package com.inventoMate.models;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;

public interface Consultas {

	List<String> listProductsByIdSucursal(JdbcTemplate jdbcTemplate, Long idSucursal);
	
}
