package com.inventoMate.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventoMate.entities.BdEmpresa;
import com.inventoMate.entities.Empresa;

public interface BdEmpresaRepository extends JpaRepository<BdEmpresa, Long> {

	Optional<BdEmpresa> findByEmpresa(Empresa empresa);

}
