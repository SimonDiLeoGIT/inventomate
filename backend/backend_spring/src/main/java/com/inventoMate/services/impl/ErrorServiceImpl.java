package com.inventoMate.services.impl;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.stereotype.Service;

import com.inventoMate.repositories.ErrorRepository;
import com.inventoMate.services.ErrorService;
import com.inventoMate.entities.Error;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ErrorServiceImpl implements ErrorService {

	private final ErrorRepository errorRepository;
	
	@Override
	public void crearError(String mensaje, int codigo, String detalle) {
        Error informe = new Error();
        informe.setTitulo(mensaje);
        informe.setCodigo(codigo);
        informe.setDetalle(detalle);
        informe.setFecha(LocalDate.now());
        informe.setHora(LocalTime.now());
        errorRepository.save(informe);
	}

}
