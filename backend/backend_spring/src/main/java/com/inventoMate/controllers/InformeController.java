package com.inventoMate.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.inventoMate.dtos.informes.InformeDTO;
import com.inventoMate.dtos.meli.TrendsDTO;
import com.inventoMate.entities.TipoInforme;
import com.inventoMate.payload.ApiResponse;
import com.inventoMate.services.InformeService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/informes")
@CrossOrigin("*")
public class InformeController {

	private final InformeService informeService;
	
	@GetMapping("/tendencias/{idSucursal}")
	public ResponseEntity<TrendsDTO> getInformeTendencias(@AuthenticationPrincipal Jwt jwt, @PathVariable Long idSucursal){
		return ResponseEntity.ok(informeService.informeDeTendencia(jwt.getSubject(), idSucursal));
	}
	
	@PostMapping("/proyeccion-de-ventas/{idSucursal}")
	public ResponseEntity<ApiResponse> getInformeProyeccionDeVentas(@AuthenticationPrincipal Jwt jwt, @PathVariable Long idSucursal,
			@RequestParam LocalDate fechaProyeccion){
		informeService.informeDeProyeccion(jwt.getSubject(), idSucursal, fechaProyeccion);
		return ResponseEntity.ok().body(new ApiResponse(true, "Informe culminado"));
	}
	
	@GetMapping("/proyeccion-de-ventas/{idSucursal}")
	public ResponseEntity<List<InformeDTO>> getInformesProyeccionDeVentas(@AuthenticationPrincipal Jwt jwt, @PathVariable Long idSucursal){
		return ResponseEntity.ok(informeService.getInformesByIdSucursalAndTipoInforme(jwt.getSubject(), idSucursal, TipoInforme.PROYECCION_DE_VENTAS));
	}
	
	@GetMapping("/proyeccion-de-ventas/{idInforme}/sucursales/{idSucursal}")
	public ResponseEntity<?> getInformeProyeccionDeVentas(@AuthenticationPrincipal Jwt jwt,@PathVariable Long idInforme, @PathVariable Long idSucursal){
		return ResponseEntity.ok(informeService.getInformeByIdInformeAndIdSucursal(jwt.getSubject(), idSucursal, idInforme));
	}
}
