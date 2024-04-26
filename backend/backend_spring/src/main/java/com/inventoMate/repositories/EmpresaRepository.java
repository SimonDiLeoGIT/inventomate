package com.inventoMate.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Sucursal;
import com.inventoMate.entities.Usuario;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

	boolean existsByOwner(Usuario owner);

	Optional<Empresa> findByOwner(Usuario owner);
	
	Optional<Empresa> findBySucursalesContains(Sucursal sucursal);
	
}
