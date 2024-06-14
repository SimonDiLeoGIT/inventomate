package com.inventoMate.models;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.JdbcTemplate;

import com.inventoMate.dtos.bdEmpresas.tablas.Categoria;
import com.inventoMate.dtos.bdEmpresas.tablas.CategoriaGanancia;
import com.inventoMate.dtos.bdEmpresas.tablas.CategoriaRangoPrecios;
import com.inventoMate.dtos.bdEmpresas.tablas.CompraDetalle;
import com.inventoMate.dtos.bdEmpresas.tablas.DetalleCompra;
import com.inventoMate.dtos.bdEmpresas.tablas.DetalleVenta;
import com.inventoMate.dtos.bdEmpresas.tablas.Producto;
import com.inventoMate.dtos.bdEmpresas.tablas.ProductoSucursalInfo;
import com.inventoMate.dtos.bdEmpresas.tablas.VentaDetalle;
import com.inventoMate.entities.TipoBd;

public class ConsultasSQL implements Consultas {

	private TipoBd dbType;

	public ConsultasSQL(TipoBd dbType) {
		this.dbType = dbType;
	}

	private String getIntervalQuery() {
		switch (dbType) {
		case POSTGRESQL:
			return "CURRENT_DATE - INTERVAL '1 year' AND CURRENT_DATE";
		case MYSQL:
			return "DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()";
		case MICROSOFTSQL:
			return "CAST(DATEADD(YEAR, -1, GETDATE()) AS DATE) AND CAST(GETDATE() AS DATE)";
		case ORACLEBD:
			return "TRUNC(ADD_MONTHS(SYSDATE, -12)) AND TRUNC(SYSDATE)";
		case SQLLITE:
			return "DATE('now', '-1 year') AND DATE('now')";
		default:
			throw new IllegalArgumentException("Tipo de base de datos no soportado: " + dbType);
		}
	}

	@Override
	public List<String> listProductsByIdSucursal(JdbcTemplate jdbcTemplate, Long idSucursal) {
		String sql = "SELECT p.nombre " + "FROM PRODUCTO p "
				+ "INNER JOIN sucursal_producto sp ON p.producto_id = sp.producto_id " + "WHERE sp.sucursal_id = ?";
		return jdbcTemplate.queryForList(sql, String.class, idSucursal);
	}

	public List<VentaDetalle> gethistoricoDeVentasByIdSucursal(JdbcTemplate jdbcTemplate, Long idSucursal) {
		String intervalQuery = getIntervalQuery();
		String sql = "SELECT v.id AS id_venta, v.fecha_hora, "
				+ "d.producto_id, d.cantidad, d.precio_venta, d.subtotal, d.promo, "
				+ "p.nombre AS nombre_producto, p.categoria_id, c.nombre AS nombre_categoria " + "FROM venta v "
				+ "INNER JOIN detalle d ON v.id = d.venta_id "
				+ "INNER JOIN producto p ON d.producto_id = p.producto_id "
				+ "INNER JOIN categoria c ON p.categoria_id = c.categoria_id "
				+ "WHERE v.sucursal_id = ? AND v.fecha_hora BETWEEN " + intervalQuery + " "
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
		String intervalQuery = getIntervalQuery();
		String sql = "SELECT c.id AS id_compra, c.fecha_hora, "
				+ "dc.producto_id, dc.cantidad, dc.precio_compra, dc.subtotal, "
				+ "p.nombre AS nombre_producto, p.categoria_id, cat.nombre AS nombre_categoria " + "FROM compra c "
				+ "INNER JOIN detalle_compra dc ON c.id = dc.compra_id "
				+ "INNER JOIN producto p ON dc.producto_id = p.producto_id "
				+ "INNER JOIN categoria cat ON p.categoria_id = cat.categoria_id "
				+ "WHERE c.sucursal_id = ? AND c.fecha_hora BETWEEN " + intervalQuery + " "
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

	@Override
	public List<ProductoSucursalInfo> getProductInformationByIdSucursal(JdbcTemplate jdbcTemplate, Long idSucCliente) {
		String sql = "SELECT p.producto_id, p.nombre, sp.stock, sp.precio_venta, cat.nombre AS nombre_categoria, "
				+ "(SELECT MIN(c.fecha_hora) " + " FROM detalle_compra dc "
				+ " INNER JOIN compra c ON dc.compra_id = c.id " + " WHERE dc.producto_id = p.producto_id "
				+ "   AND c.sucursal_id = sp.sucursal_id) AS fecha_primera_compra " + "FROM PRODUCTO p "
				+ "INNER JOIN categoria cat ON p.categoria_id = cat.categoria_id "
				+ "INNER JOIN sucursal_producto sp ON p.producto_id = sp.producto_id " + "WHERE sp.sucursal_id = ?";

		return jdbcTemplate.queryForList(sql, idSucCliente).stream()
				.map(row -> ProductoSucursalInfo.builder().nombre((String) row.get("nombre"))
						.productId((Integer) row.get("producto_id")).stock((Integer) row.get("stock"))
						.fechaPrimerCompra((Timestamp) row.get("fecha_primera_compra"))
						.categoria((String) row.get("nombre_categoria")).precioVenta((Double) row.get("precio_venta"))
						.build())
				.collect(Collectors.toList());
	}

	@Override
	public List<CategoriaGanancia> getProductoPorcentajeGanancia(JdbcTemplate jdbcTemplate, Long idSucCliente) {
		String sql = "WITH ultimas_ventas AS (" + "    SELECT d.producto_id, d.precio_venta, "
				+ "           ROW_NUMBER() OVER (PARTITION BY d.producto_id ORDER BY v.fecha_hora DESC) AS rn "
				+ "    FROM detalle d " + "    INNER JOIN venta v ON d.venta_id = v.id "
				+ "    WHERE v.sucursal_id = ? " + "), " + "ultimas_compras AS ("
				+ "    SELECT dc.producto_id, dc.precio_compra, "
				+ "           ROW_NUMBER() OVER (PARTITION BY dc.producto_id ORDER BY c.fecha_hora DESC) AS rn "
				+ "    FROM detalle_compra dc " + "    INNER JOIN compra c ON dc.compra_id = c.id "
				+ "    WHERE c.sucursal_id = ? " + ") " + "SELECT p.categoria_id, c.nombre AS nombre_categoria, "
				+ "       AVG((uv.precio_venta - uc.precio_compra) / uc.precio_compra * 100) AS ganancia_promedio "
				+ "FROM producto p " + "INNER JOIN categoria c ON p.categoria_id = c.categoria_id "
				+ "INNER JOIN sucursal_producto sp ON p.producto_id = sp.producto_id "
				+ "INNER JOIN ultimas_ventas uv ON p.producto_id = uv.producto_id AND uv.rn = 1 "
				+ "INNER JOIN ultimas_compras uc ON p.producto_id = uc.producto_id AND uc.rn = 1 "
				+ "GROUP BY p.categoria_id, c.nombre";

		return jdbcTemplate.queryForList(sql, idSucCliente, idSucCliente).stream()
				.map(row -> CategoriaGanancia.builder().idCategoria((Integer) row.get("categoria_id"))
						.nombre((String) row.get("nombre_categoria"))
						.porcentajeGananciaPromedio((Double) row.get("ganancia_promedio")).build())
				.collect(Collectors.toList());
	}

	@Override
	public List<CategoriaRangoPrecios> getRangoPreciosPorCategoria(JdbcTemplate jdbcTemplate, Long idSucCliente) {
		String sql = "SELECT p.categoria_id, c.nombre AS nombre_categoria, "
				+ "MIN(sp.precio_venta) AS precio_minimo, MAX(sp.precio_venta) AS precio_maximo "
				+ "FROM sucursal_producto sp " + "INNER JOIN producto p ON sp.producto_id = p.producto_id "
				+ "INNER JOIN categoria c ON p.categoria_id = c.categoria_id " + "WHERE sp.sucursal_id = ? "
				+ "GROUP BY p.categoria_id, c.nombre";

		return jdbcTemplate.queryForList(sql, idSucCliente).stream()
				.map(row -> CategoriaRangoPrecios.builder().idCategoria((Integer) row.get("categoria_id"))
						.nombreCategoria((String) row.get("nombre_categoria"))
						.precioMaximo((Double) row.get("precio_maximo")).precioMinimo((Double) row.get("precio_minimo"))
						.build())
				.collect(Collectors.toList());
	}
}
