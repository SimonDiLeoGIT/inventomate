package com.inventoMate.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventoMate.dtos.bdEmpresas.BdEmpresaDTO;
import com.inventoMate.entities.TipoBd;
import com.inventoMate.payload.ApiResponse;
import com.inventoMate.services.BdEmpresaService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/bd-empresa")
@CrossOrigin("*")
@AllArgsConstructor
public class BdEmpresaController {

	private final BdEmpresaService bdEmpresaService;

	@PostMapping("/create")
	public ResponseEntity<BdEmpresaDTO> createBdEmpresa(@AuthenticationPrincipal Jwt jwt,
			@RequestBody BdEmpresaDTO bdEmpresaDTO) {
		var idAuth0 = jwt.getSubject();
		return ResponseEntity.ok(bdEmpresaService.createBdEmpresa(idAuth0, bdEmpresaDTO));
	}

	@GetMapping("/gestores")
	public ResponseEntity<List<String>> listGestores() {
		return ResponseEntity.ok(List.of(TipoBd.MYSQL.name(), TipoBd.MICROSOFTSQL.name(), TipoBd.ORACLEBD.name(),
				TipoBd.POSTGRESQL.name(), TipoBd.SQLLITE.name()));
	}

	@PutMapping("/edit")
	public ResponseEntity<BdEmpresaDTO> editBdEmpresa(@AuthenticationPrincipal Jwt jwt,
			@RequestBody BdEmpresaDTO bdEmpresaDTO) {
		var idAuth0 = jwt.getSubject();
		return ResponseEntity.ok(bdEmpresaService.editBdEmpresa(idAuth0, bdEmpresaDTO));
	}

	@DeleteMapping("/delete")
	public ResponseEntity<ApiResponse> deleteEmpresa(@AuthenticationPrincipal Jwt jwt) {
		var idAuth0 = jwt.getSubject();
		bdEmpresaService.deleteEmpresa(idAuth0);
		return ResponseEntity.ok().body(new ApiResponse(true, "Bd-empresa deleted successfully"));
	}

	@GetMapping()
	public ResponseEntity<BdEmpresaDTO> getBdEmpresaCurrentUser(@AuthenticationPrincipal Jwt jwt) {
		var idAuth0 = jwt.getSubject();
		return ResponseEntity.ok(bdEmpresaService.getBdEmpresaCurrentUser(idAuth0));
	}
}
