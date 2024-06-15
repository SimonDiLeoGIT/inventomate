package com.inventoMate.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inventoMate.entities.Rol;
import com.inventoMate.entities.Usuario;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {

	Optional<Rol> findByNombreRol(String nombreRol);

	Optional<List<Rol>> findAllByUsuariosContains(Usuario usuario);

}
