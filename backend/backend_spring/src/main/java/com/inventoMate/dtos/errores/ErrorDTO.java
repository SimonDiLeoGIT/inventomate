package com.inventoMate.dtos.errores;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ErrorDTO {

    private Long id;
    private String titulo;
    private int codigo;
    private String detalle;
    private LocalDate fecha;
    private LocalTime hora;
	
}
