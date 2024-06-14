package com.inventoMate.configuration.bd;

import java.util.Collections;

import org.springframework.context.annotation.Configuration;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.entities.Rol;
import com.inventoMate.repositories.RolRepository;
import com.inventoMate.services.RoleAuth0Service;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Configuration
public class DataBaseConfig {

	private final RoleAuth0Service auth0RoleService;
	private final RolRepository rolRepository;
	
	@PostConstruct
	public void initializeRoles() {
		if (rolRepository.count() == 0) {
			System.out.println("Sincronizando roles de Auth0 con BD local..");
			try {
				var roles = auth0RoleService.getAllRoles();
				roles.subList(1, roles.size()).forEach(role -> {
					Rol rol = new Rol();
					rol.setDescripcion(role.getDescription());
					rol.setIdRolAuth0(role.getId());
					rol.setNombreRol(role.getName());
					rol.setUsuarios(Collections.emptyList());
					rolRepository.save(rol);					
				});
				Rol rol = new Rol();
				rol.setDescripcion(roles.get(0).getDescription());
				rol.setIdRolAuth0(roles.get(0).getId());
				rol.setNombreRol(roles.get(0).getName());
				rol.setUsuarios(Collections.emptyList());
				rolRepository.save(rol);
			} catch (Auth0Exception e) {
				System.out.println("No se pudo sincronizar los roles de Auth0 con BD local..");
				e.printStackTrace();
			}
		}
	}
}