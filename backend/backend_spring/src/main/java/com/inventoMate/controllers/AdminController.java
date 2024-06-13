package com.inventoMate.controllers;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.inventoMate.dtos.valoracion.ValoracionDTO;
import com.inventoMate.entities.TipoInforme;
import com.inventoMate.services.AdminService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/admin")
@CrossOrigin("*")
@AllArgsConstructor
public class AdminController {

	private final AdminService adminService;

	@GetMapping("/valoraciones")
	public ResponseEntity<Page<ValoracionDTO>> getStatsInformes(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sort,
			@RequestParam(defaultValue = "desc") String order, @RequestParam(required = false) TipoInforme tipoInforme,
			@RequestParam(required = false) Integer estrellas, @RequestParam(required = false) LocalDate desde,
			@RequestParam(required = false) LocalDate hasta) {
		Sort.Direction sortDirection = Sort.Direction.fromString(order);
		Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sort));
		Page<ValoracionDTO> valoraciones = adminService.getValoraciones(pageable, tipoInforme, estrellas, desde,
				hasta);
		return ResponseEntity.ok(valoraciones);
	}

}
