package com.inventoMate.controllers;

import java.time.LocalDate;
import java.time.LocalTime;

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

import com.inventoMate.dtos.errores.ErrorDTO;
import com.inventoMate.dtos.informes.InformeStatsResponse;
import com.inventoMate.dtos.tiempoInforme.TiempoInformeDTO;
import com.inventoMate.dtos.valoracion.ValoracionDTO;
import com.inventoMate.dtos.valoracion.ValoracionStatsResponse;
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
	public ResponseEntity<Page<ValoracionDTO>> getValoracionesInformes(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sort,
			@RequestParam(defaultValue = "desc") String order, @RequestParam(required = false) TipoInforme tipoInforme,
			@RequestParam(required = false) Integer estrellas, @RequestParam(required = false) LocalDate desde,
			@RequestParam(required = false) LocalDate hasta) {
		Sort.Direction sortDirection = Sort.Direction.fromString(order);
		Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sort));
		Page<ValoracionDTO> valoraciones = adminService.getValoraciones(pageable, tipoInforme, estrellas, desde, hasta);
		return ResponseEntity.ok(valoraciones);
	}

	@GetMapping("/valoraciones/stats")
	public ResponseEntity<ValoracionStatsResponse> getValoracionesStats(@RequestParam(required = false) LocalDate desde,
			@RequestParam(required = false) LocalDate hasta) {
		return ResponseEntity.ok(adminService.getValoracionesStats(desde, hasta));
	}

	@GetMapping("/informes/tiempos")
	public ResponseEntity<Page<TiempoInformeDTO>> getTiempos(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sort,
			@RequestParam(defaultValue = "desc") String sortDirection,
			@RequestParam(required = false) TipoInforme tipoInforme, @RequestParam(required = false) LocalDate desde,
			@RequestParam(required = false) LocalDate hasta) {

		Sort.Direction direction = Sort.Direction.fromString(sortDirection);
		Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort));

		Page<TiempoInformeDTO> tiempos = adminService.getTiemposInforme(pageable, tipoInforme, desde, hasta);

		return ResponseEntity.ok(tiempos);
	}

	@GetMapping("/informes/stats")
	public ResponseEntity<InformeStatsResponse> getInformeStats(@RequestParam(required = false) LocalDate desde,
			@RequestParam(required = false) LocalDate hasta) {
		return ResponseEntity.ok(adminService.getInformeStats(desde, hasta));
	}

	@GetMapping("/errores")
	public ResponseEntity<Page<ErrorDTO>> getErrores(@RequestParam(required = false) LocalDate desde,
			@RequestParam(required = false) LocalDate hasta, @RequestParam(required = false) LocalTime horaInicio,
			@RequestParam(required = false) LocalTime horaFin, @RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sort,
			@RequestParam(defaultValue = "desc") String sortDirection) {
		Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sortDirection), sort));
		Page<ErrorDTO> errores = adminService.getErrores(desde, hasta, horaInicio, horaFin, page, size, sort,
				sortDirection, pageable);
		return ResponseEntity.ok(errores);
	}

}
