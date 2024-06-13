package com.inventoMate.repositories;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.inventoMate.entities.TiempoInforme;
import com.inventoMate.entities.TipoInforme;

public interface TiempoInformeRepository extends JpaRepository<TiempoInforme, Long> {

    @Query("SELECT COUNT(ti) FROM TiempoInforme ti WHERE " +
            "(:tipoInforme IS NULL OR ti.tipoInforme = :tipoInforme) AND " +
            "(:fechaInicio IS NULL OR ti.fecha >= :fechaInicio) AND " +
            "(:fechaFin IS NULL OR ti.fecha <= :fechaFin)")
     int countByTipoInformeAndFechas(
             @Param("tipoInforme") TipoInforme tipoInforme,
             @Param("fechaInicio") LocalDate fechaInicio,
             @Param("fechaFin") LocalDate fechaFin
     );

     @Query("SELECT COUNT(ti) FROM TiempoInforme ti WHERE " +
            "(:fechaInicio IS NULL OR ti.fecha >= :fechaInicio) AND " +
            "(:fechaFin IS NULL OR ti.fecha <= :fechaFin)")
     long countByFechas(
             @Param("fechaInicio") LocalDate fechaInicio,
             @Param("fechaFin") LocalDate fechaFin
     );

     @Query("SELECT AVG(ti.duracionSegundos) FROM TiempoInforme ti WHERE " +
            "(:tipoInforme IS NULL OR ti.tipoInforme = :tipoInforme) AND " +
            "(:fechaInicio IS NULL OR ti.fecha >= :fechaInicio) AND " +
            "(:fechaFin IS NULL OR ti.fecha <= :fechaFin)")
     Double averageDuracionSegundosByTipoInformeAndFechas(
             @Param("tipoInforme") TipoInforme tipoInforme,
             @Param("fechaInicio") LocalDate fechaInicio,
             @Param("fechaFin") LocalDate fechaFin
     );

     @Query("SELECT AVG(ti.duracionSegundos) FROM TiempoInforme ti WHERE " +
            "(:fechaInicio IS NULL OR ti.fecha >= :fechaInicio) AND " +
            "(:fechaFin IS NULL OR ti.fecha <= :fechaFin)")
     Double averageDuracionSegundosByFechas(
             @Param("fechaInicio") LocalDate fechaInicio,
             @Param("fechaFin") LocalDate fechaFin
     );
	
}
