package com.inventoMate.models;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.JdbcTemplate;

import com.inventoMate.dtos.bdEmpresas.tablas.Categoria;
import com.inventoMate.dtos.bdEmpresas.tablas.CompraDetalle;
import com.inventoMate.dtos.bdEmpresas.tablas.DetalleCompra;
import com.inventoMate.dtos.bdEmpresas.tablas.DetalleVenta;
import com.inventoMate.dtos.bdEmpresas.tablas.Producto;
import com.inventoMate.dtos.bdEmpresas.tablas.VentaDetalle;

public class ConsultasSQL implements Consultas {

	@Override
	public List<String> listProductsByIdSucursal(JdbcTemplate jdbcTemplate, Long idSucursal) {
		String sql = "SELECT p.nombre " + "FROM PRODUCTO p "
				+ "INNER JOIN sucursal_producto sp ON p.producto_id = sp.producto_id " + "WHERE sp.sucursal_id = ?";
		return jdbcTemplate.queryForList(sql, String.class, idSucursal);
	}

	public List<VentaDetalle> gethistoricoDeVentasByIdSucursal(JdbcTemplate jdbcTemplate, Long idSucursal) {
		String sql = "SELECT v.id AS id_venta, v.fecha_hora, "
				+ "d.producto_id, d.cantidad, d.precio_venta, d.subtotal, d.promo, "
				+ "p.nombre AS nombre_producto, p.categoria_id, c.nombre AS nombre_categoria " + "FROM venta v "
				+ "INNER JOIN detalle d ON v.id = d.venta_id "
				+ "INNER JOIN producto p ON d.producto_id = p.producto_id "
				+ "INNER JOIN categoria c ON p.categoria_id = c.categoria_id "
				+ "WHERE v.sucursal_id = ? AND v.fecha_hora BETWEEN CURRENT_DATE - INTERVAL '1 year' AND CURRENT_DATE "
				+ "ORDER BY v.fecha_hora DESC";

		return jdbcTemplate.queryForList(sql, idSucursal).stream().map(row -> {
			VentaDetalle ventaDetalle = new VentaDetalle();
			ventaDetalle.setIdVenta((Integer) row.get("id_venta"));
			ventaDetalle.setFechaHora((Timestamp) row.get("fecha_hora"));

			DetalleVenta detalleVenta = new DetalleVenta();
			detalleVenta.setCantidad((Integer) row.get("cantidad"));
			detalleVenta.setPrecioUnitario((Double) row.get("precio_venta"));
			detalleVenta.setSubtotal((Double) row.get("subtotal"));
			detalleVenta.setPromo((Integer) row.get("promo") != null ? (Integer) row.get("promo") : 0);

			Producto producto = new Producto();
			producto.setIdProducto((Integer) row.get("producto_id"));
			producto.setNombre((String) row.get("nombre_producto"));

			Categoria categoria = new Categoria();
			categoria.setIdCategoria((Integer) row.get("categoria_id"));
			categoria.setNombre((String) row.get("nombre_categoria"));

			producto.setCategoria(categoria);
			detalleVenta.setProducto(producto);

			ventaDetalle.setDetalle(detalleVenta);

			return ventaDetalle;
		}).collect(Collectors.toList());
	}

	public List<CompraDetalle> getHistoricoDeComprasByIdSucursal(JdbcTemplate jdbcTemplate, Long idSucursal) {
		String sql = "SELECT c.id AS id_compra, c.fecha_hora, "
				+ "dc.producto_id, dc.cantidad, dc.precio_compra, dc.subtotal, "
				+ "p.nombre AS nombre_producto, p.categoria_id, cat.nombre AS nombre_categoria " + "FROM compra c "
				+ "INNER JOIN detalle_compra dc ON c.id = dc.compra_id "
				+ "INNER JOIN producto p ON dc.producto_id = p.producto_id "
				+ "INNER JOIN categoria cat ON p.categoria_id = cat.categoria_id "
				+ "WHERE c.sucursal_id = ? AND c.fecha_hora BETWEEN CURRENT_DATE - INTERVAL '1 year' AND CURRENT_DATE "
				+ "ORDER BY c.fecha_hora DESC";

		return jdbcTemplate.queryForList(sql, idSucursal).stream().map(row -> {
			CompraDetalle compraDetalle = new CompraDetalle();
			compraDetalle.setIdCompra((Integer) row.get("id_compra"));
			compraDetalle.setFechaHora((Timestamp) row.get("fecha_hora"));

			DetalleCompra detalleCompra = new DetalleCompra();
			detalleCompra.setCantidad((Integer) row.get("cantidad"));
			detalleCompra.setPrecioUnitario((Double) row.get("precio_compra"));
			detalleCompra.setSubtotal((Double) row.get("subtotal"));

			Producto producto = new Producto();
			producto.setIdProducto((Integer) row.get("producto_id"));
			producto.setNombre((String) row.get("nombre_producto"));

			Categoria categoria = new Categoria();
			categoria.setIdCategoria((Integer) row.get("categoria_id"));
			categoria.setNombre((String) row.get("nombre_categoria"));

			producto.setCategoria(categoria);
			detalleCompra.setProducto(producto);

			compraDetalle.setDetalle(detalleCompra);

			return compraDetalle;
		}).collect(Collectors.toList());
	}
}
