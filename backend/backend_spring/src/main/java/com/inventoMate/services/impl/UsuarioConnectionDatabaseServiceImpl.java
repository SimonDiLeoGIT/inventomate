package com.inventoMate.services.impl;

import javax.sql.DataSource;

import org.springframework.context.annotation.Lazy;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Service;

import com.inventoMate.entities.BdEmpresa;
import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.TipoBd;
import com.inventoMate.entities.Usuario;
import com.inventoMate.exceptions.ResourceNotFoundException;
import com.inventoMate.repositories.BdEmpresaRepository;
import com.inventoMate.repositories.EmpresaRepository;
import com.inventoMate.repositories.UsuarioRepository;
import com.inventoMate.services.UsuarioConnectionDatabaseService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UsuarioConnectionDatabaseServiceImpl implements UsuarioConnectionDatabaseService {

    private final BdEmpresaRepository bdEmpresaRepository;
    private final EmpresaRepository empresaRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public JdbcTemplate getJdbcTemplateForUser(String auth0Id) {
    	
    	Usuario owner = usuarioRepository.findByIdAuth0(auth0Id).orElseThrow(
    			() -> new ResourceNotFoundException("Usuario", "Auth0_id", auth0Id));
    	
    	Empresa empresa = empresaRepository.findByOwner(owner).orElseThrow(
    			() -> new ResourceNotFoundException("Empresa", "usuario_id", owner.getIdUsuario().toString()));
    	
        BdEmpresa connectionInfo = bdEmpresaRepository.findByEmpresa(empresa).orElseThrow(
    			() -> new ResourceNotFoundException("Bd_empresa", "empresa_id", empresa.getIdEmpresa().toString()));
        
        DataSource dataSource = createDataSource(connectionInfo);
        
        return new JdbcTemplate(dataSource);
    }

    @Lazy
    private DataSource createDataSource(BdEmpresa connectionInfo) {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(getDriverClassName(connectionInfo.getGestorBd()));
        dataSource.setUrl(connectionInfo.getUrl());
        dataSource.setUsername(connectionInfo.getUsername());
        dataSource.setPassword(connectionInfo.getPassword());
        return dataSource;
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
