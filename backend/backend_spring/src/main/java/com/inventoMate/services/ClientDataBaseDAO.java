package com.inventoMate.services;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;

public interface ClientDataBaseDAO {

	List<String> listProductsByIdSucursal(JdbcTemplate jdbcTemplate, Long idSucursal);
	
}
