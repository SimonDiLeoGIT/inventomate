package com.inventoMate.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inventoMate.entities.Informe;
import java.util.List;
import com.inventoMate.entities.TipoInforme;

@Repository
public interface InformeRepository extends JpaRepository<Informe, Long> {

	List<Informe> findByTipoInforme(TipoInforme tipoInforme);
}
