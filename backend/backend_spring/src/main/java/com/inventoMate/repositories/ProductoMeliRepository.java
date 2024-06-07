package com.inventoMate.repositories;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventoMate.entities.ProductoMeli;

import jakarta.transaction.Transactional;

public interface ProductoMeliRepository extends JpaRepository<ProductoMeli, Long> {

	@Transactional
    void deleteByFechaBefore(LocalDate fecha);
	
}
