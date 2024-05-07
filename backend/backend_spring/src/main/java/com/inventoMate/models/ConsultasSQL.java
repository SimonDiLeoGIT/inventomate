package com.inventoMate.models;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;

public class ConsultasSQL implements Consultas {

	@Override
    public List<String> listProductsByIdSucursal(JdbcTemplate jdbcTemplate, Long idSucursal) {
        String sql = "SELECT p.nombre " +
                     "FROM PRODUCTO p " +
                     "INNER JOIN sucursal_producto sp ON p.producto_id = sp.producto_id " +
                     "WHERE sp.sucursal_id = ?";
        return jdbcTemplate.queryForList(sql, String.class, idSucursal);
    }
}
