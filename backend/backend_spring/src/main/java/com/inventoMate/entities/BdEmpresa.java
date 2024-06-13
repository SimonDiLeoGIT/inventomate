package com.inventoMate.entities;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import com.inventoMate.dtos.bdEmpresas.tablas.CategoriaGanancia;
import com.inventoMate.dtos.bdEmpresas.tablas.CategoriaRangoPrecios;
import com.inventoMate.dtos.bdEmpresas.tablas.CompraDetalle;
import com.inventoMate.dtos.bdEmpresas.tablas.ProductoSucursalInfo;
import com.inventoMate.dtos.bdEmpresas.tablas.VentaDetalle;
import com.inventoMate.models.Consultas;
import com.inventoMate.models.ConsultasSQL;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "BD_empresa")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BdEmpresa {

	@Id
	@Column(name = "id_bd_empresa")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idBdEmpresa;

	@Column(name = "gestor_bd", nullable = false)
	@Enumerated(EnumType.STRING)
	private TipoBd gestorBd;

	@Column(nullable = false)
	private String url;

	@Column(nullable = false)
	private String username;

	@Column(nullable = false)
	private String password;

	@OneToOne(mappedBy = "bdEmpresa", cascade = CascadeType.ALL)
	private Empresa empresa;

	@Transient
	private DataSource datasource;

	@Transient
	private Consultas consultasSQL;

	public void connect() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName(getDriverClassName(getGestorBd()));
		dataSource.setUrl(getUrl());
		dataSource.setUsername(getUsername());
		dataSource.setPassword(getPassword());
		this.consultasSQL = new ConsultasSQL(gestorBd);
		this.setDatasource(dataSource);
	}

	public List<String> obtenerProductosDeSucursal(Long idSucursal) {
		return consultasSQL.listProductsByIdSucursal(new JdbcTemplate(this.datasource), idSucursal);
	}

	public List<VentaDetalle> obtenerHistoricoDeVentas(Long idSucCliente) {
		return consultasSQL.gethistoricoDeVentasByIdSucursal(new JdbcTemplate(this.datasource), idSucCliente);
	}

	public List<CompraDetalle> obtenerHistoricoDeCompras(Long idSucCliente) {
		return consultasSQL.getHistoricoDeComprasByIdSucursal(new JdbcTemplate(this.datasource), idSucCliente);
	}

	private String getDriverClassName(TipoBd tipoBd) {
		switch (tipoBd) {
		case MYSQL:
			return "com.mysql.cj.jdbc.Driver";
		case POSTGRESQL:
			return "org.postgresql.Driver";
		case MICROSOFTSQL:
			return "com.microsoft.sqlserver.jdbc.SQLServerDriver";
		case ORACLEBD:
			return "oracle.jdbc.driver.OracleDriver";
		case SQLLITE:
			return "org.sqlite.JDBC";
		default:
			throw new IllegalArgumentException("Tipo de base de datos no soportado: " + tipoBd);
		}
	}

	public List<ProductoSucursalInfo> obtenerProductos(Long idSucCliente) {
		return consultasSQL.getProductInformationByIdSucursal(new JdbcTemplate(this.datasource), idSucCliente);
	}

	public List<CategoriaRangoPrecios> obtenerRangoPreciosCategoria(Long idSucCliente) {
		return consultasSQL.getRangoPreciosPorCategoria(new JdbcTemplate(this.datasource), idSucCliente);
	}

	public List<CategoriaGanancia> obtenerGananciaCategoria(Long idSucCliente) {
		return consultasSQL.getProductoPorcentajeGanancia(new JdbcTemplate(this.datasource), idSucCliente);
	}
}
