package com.inventoMate.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventoMate.entities.Sucursal;
import com.inventoMate.entities.Usuario;

public interface SucursalRepository extends JpaRepository<Sucursal, Long> {

	boolean existsByUsuariosContains(Usuario usuario);

	Optional<Sucursal> findByUsuariosContains(Usuario usuario);
	
}
