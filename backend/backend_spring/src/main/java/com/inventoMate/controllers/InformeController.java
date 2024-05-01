package com.inventoMate.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventoMate.dtos.meli.TrendsDTO;
import com.inventoMate.fecade.InformeFecade;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/informes")
@CrossOrigin("*")
public class InformeController {

	private final InformeFecade informeFecade;
	
	@GetMapping("/tendencias/{idSucursal}")
	public ResponseEntity<TrendsDTO> getInformeTendencias(@AuthenticationPrincipal Jwt jwt, @PathVariable Long idSucursal){
		return ResponseEntity.ok(informeFecade.informeDeTendencia(jwt.getSubject(), idSucursal));
	}
	
}
