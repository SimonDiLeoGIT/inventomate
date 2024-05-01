package com.inventoMate.services;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;

public interface InformeTendenciaService {

	List<String> execute(JdbcTemplate jdbcTemplate, Long idSucursal);
	
}
