package com.inventoMate.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventoMate.entities.Usuario;


public interface UsuarioRepository extends JpaRepository<Usuario,Long>{

	boolean existsByIdAuth0(String idAuth0);

	Optional<Usuario> findByIdAuth0(String idAuth0);

	void deleteByIdAuth0(String idAuth0);
	
}
