package com.inventoMate.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.dtos.empresas.EmpresaDTO;
import com.inventoMate.services.EmpresaService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("api/empresas")
@Validated
@CrossOrigin("*")
public class EmpresaController {

	private final EmpresaService empresaService;

	@PostMapping("/create")
	public ResponseEntity<EmpresaDTO> createEmpresa(@AuthenticationPrincipal Jwt jwt, @RequestBody EmpresaDTO empresaDTO)
			throws Auth0Exception {
		var idOwner = jwt.getSubject();
		return ResponseEntity.ok(empresaService.createEmpresa(idOwner, empresaDTO));
	}

	@GetMapping("/me")
	public ResponseEntity<EmpresaDTO> getMethodName(@AuthenticationPrincipal Jwt jwt) throws Auth0Exception {
		var idOwner = jwt.getSubject();
		return ResponseEntity.ok(empresaService.getEmpresaByOwnerAuht0Id(idOwner));
	}

}
