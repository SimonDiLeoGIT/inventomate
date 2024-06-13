package com.inventoMate.repositories;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.inventoMate.entities.TipoInforme;
import com.inventoMate.entities.Valoracion;

@Repository
public interface ValoracionRepository extends JpaRepository<Valoracion, Long> {

	@Query("SELECT v FROM Valoracion v WHERE " + "(:tipoInforme IS NULL OR v.informe.tipoInforme = :tipoInforme) AND "
			+ "(:estrellas IS NULL OR v.cantEstrellas = :estrellas) AND "
			+ "(:fechaInicio IS NULL OR v.fecha >= :fechaInicio) AND " + "(:fechaFin IS NULL OR v.fecha <= :fechaFin)")
	Page<Valoracion> findByFilters(@Param("tipoInforme") TipoInforme tipoInforme, @Param("estrellas") Integer estrellas,
			@Param("fechaInicio") LocalDate fechaInicio, @Param("fechaFin") LocalDate fechaFin, Pageable pageable);

	 @Query("SELECT COUNT(v) FROM Valoracion v WHERE " +
	           "(:tipoInforme IS NULL OR v.informe.tipoInforme = :tipoInforme) AND " +
	           "(:fechaInicio IS NULL OR v.fecha >= :fechaInicio) AND " +
	           "(:fechaFin IS NULL OR v.fecha <= :fechaFin)")
	    int countByTipoInformeAndFechas(
	            @Param("tipoInforme") TipoInforme tipoInforme,
	            @Param("fechaInicio") LocalDate fechaInicio,
	            @Param("fechaFin") LocalDate fechaFin
	    );

	    @Query("SELECT COUNT(v) FROM Valoracion v WHERE " +
	           "(:fechaInicio IS NULL OR v.fecha >= :fechaInicio) AND " +
	           "(:fechaFin IS NULL OR v.fecha <= :fechaFin)")
	    long countByFechas(
	            @Param("fechaInicio") LocalDate fechaInicio,
	            @Param("fechaFin") LocalDate fechaFin
	    );

	    @Query("SELECT AVG(v.cantEstrellas) FROM Valoracion v WHERE " +
	           "(:tipoInforme IS NULL OR v.informe.tipoInforme = :tipoInforme) AND " +
	           "(:fechaInicio IS NULL OR v.fecha >= :fechaInicio) AND " +
	           "(:fechaFin IS NULL OR v.fecha <= :fechaFin)")
	    Double averageCantEstrellasByTipoInformeAndFechas(
	            @Param("tipoInforme") TipoInforme tipoInforme,
	            @Param("fechaInicio") LocalDate fechaInicio,
	            @Param("fechaFin") LocalDate fechaFin
	    );

	    @Query("SELECT AVG(v.cantEstrellas) FROM Valoracion v WHERE " +
	           "(:fechaInicio IS NULL OR v.fecha >= :fechaInicio) AND " +
	           "(:fechaFin IS NULL OR v.fecha <= :fechaFin)")
	    Double averageCantEstrellasByFechas(
	            @Param("fechaInicio") LocalDate fechaInicio,
	            @Param("fechaFin") LocalDate fechaFin
	    );
}
