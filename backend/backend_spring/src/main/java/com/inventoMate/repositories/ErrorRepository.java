package com.inventoMate.repositories;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.inventoMate.entities.Error;

public interface ErrorRepository extends JpaRepository<com.inventoMate.entities.Error, Long> {

	@Query("SELECT e FROM Error e WHERE " + "(:desde IS NULL OR e.fecha >= :desde) AND "
			+ "(:hasta IS NULL OR e.fecha <= :hasta) AND " + "(:horaInicio IS NULL OR e.hora >= :horaInicio) AND "
			+ "(:horaFin IS NULL OR e.hora <= :horaFin)")
	Page<Error> findByFilters(@Param("desde") LocalDate desde, @Param("hasta") LocalDate hasta,
			@Param("horaInicio") LocalTime horaInicio, @Param("horaFin") LocalTime horaFin, Pageable pageable);

}
