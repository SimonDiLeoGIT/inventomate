package com.inventoMate.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.dtos.empresas.EditEmpresaRequest;
import com.inventoMate.dtos.empresas.EmpresaDTO;
import com.inventoMate.dtos.empresas.EmpresaProfileResponse;
import com.inventoMate.payload.ApiResponse;
import com.inventoMate.services.EmpresaService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("api/empresas")
@Validated
@CrossOrigin("*")
public class EmpresaController {

	private final EmpresaService empresaService;

	@PostMapping("/create")
	public ResponseEntity<EmpresaDTO> createEmpresa(@AuthenticationPrincipal Jwt jwt,
			@RequestBody EmpresaDTO empresaDTO) throws Auth0Exception {
		var idOwner = jwt.getSubject();
		return ResponseEntity.ok(empresaService.createEmpresa(idOwner, empresaDTO));
	}

	@GetMapping("/profile")
	public ResponseEntity<EmpresaProfileResponse> getMethodName(@AuthenticationPrincipal Jwt jwt)
			throws Auth0Exception {
		var idAuth0 = jwt.getSubject();
		return ResponseEntity.ok(empresaService.getEmpresaProfile(idAuth0));
	}

	@PutMapping("/edit")
	public ResponseEntity<EmpresaProfileResponse> editEmpresa(@AuthenticationPrincipal Jwt jwt,
			@RequestBody @Valid EditEmpresaRequest editEmpresaRequest) {
		var idAuth0 = jwt.getSubject();
		return ResponseEntity.ok(empresaService.updateEmpresa(idAuth0, editEmpresaRequest));
	}

	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteEmpresa(@AuthenticationPrincipal Jwt jwt) throws Auth0Exception {
		var idAuth0 = jwt.getSubject();
		empresaService.deleteEmpresa(idAuth0);
		return ResponseEntity.ok().body(new ApiResponse(true, "Empresa deleted successfully"));
	}
	
	@GetMapping("/exists/bd-empresa")
	public ResponseEntity<Boolean> existsBdEmpresa(@AuthenticationPrincipal Jwt jwt) {
		var idAuth0 = jwt.getSubject();
		return ResponseEntity.ok(empresaService.existsBdEmpresa(idAuth0));
	}
}
