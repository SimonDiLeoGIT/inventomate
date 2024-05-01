package com.inventoMate.services.impl;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.inventoMate.services.InformeTendenciaService;

@Service
public class InformeTendenciaServiceImpl implements InformeTendenciaService{

	@Override
    public List<String> execute(JdbcTemplate jdbcTemplate, Long idSucursal) {
        String sql = "SELECT p.nombre " +
                     "FROM PRODUCTO p " +
                     "INNER JOIN sucursal_producto sp ON p.producto_id = sp.producto_id " +
                     "WHERE sp.sucursal_id = ?";
        return jdbcTemplate.queryForList(sql, String.class, idSucursal);
    }
	
}
