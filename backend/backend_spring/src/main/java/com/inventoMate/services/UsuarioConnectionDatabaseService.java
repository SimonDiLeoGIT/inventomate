package com.inventoMate.services;

import org.springframework.jdbc.core.JdbcTemplate;

public interface UsuarioConnectionDatabaseService {

	JdbcTemplate getJdbcTemplateForUser(String auth0Id);
	
}
