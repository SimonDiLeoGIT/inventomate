package com.inventoMate.entities;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

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
	private ConsultasSQL consultasSQL;
	
	public void connect() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(getDriverClassName(getGestorBd()));
        dataSource.setUrl(getUrl());
        dataSource.setUsername(getUsername());
        dataSource.setPassword(getPassword());
        this.consultasSQL = new ConsultasSQL();
        this.setDatasource(dataSource);
	}

	public List<String> obtenerProductosDeSucursal(Long idSucursal){
		return consultasSQL.listProductsByIdSucursal(new JdbcTemplate(this.datasource), idSucursal);
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
}
