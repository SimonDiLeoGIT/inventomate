package com.inventoMate.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inventoMate.entities.CategoriaMeli;

@Repository
public interface CategoriaMeliRepository extends JpaRepository<CategoriaMeli, Long>{

}
