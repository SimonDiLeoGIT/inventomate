package com.inventoMate.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inventoMate.entities.CategoriaMeli;

@Repository
public interface CategoriaMeliRepository extends JpaRepository<CategoriaMeli, Long> {

	Optional<CategoriaMeli> findByIdMeli(String key);

	Optional<CategoriaMeli> findByNombre(String categoryName);

}
