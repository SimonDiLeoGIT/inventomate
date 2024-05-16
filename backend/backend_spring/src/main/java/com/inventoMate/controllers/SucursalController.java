package com.inventoMate.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.dtos.roles.RolDTO;
import com.inventoMate.dtos.sucursales.SucursalDTO;
import com.inventoMate.dtos.sucursales.SucursalProfileResponse;
import com.inventoMate.payload.ApiResponse;
import com.inventoMate.services.SucursalService;
import com.inventoMate.services.UsuarioService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/sucursales")
@CrossOrigin("*")
@AllArgsConstructor
public class SucursalController {

	private final SucursalService sucursalService;
	private final UsuarioService usuarioService;

	@PostMapping("/create")
	public ResponseEntity<SucursalProfileResponse> createUserWithRole(@AuthenticationPrincipal Jwt jwt,
			@RequestBody SucursalDTO sucursalDTO) throws Auth0Exception {
		var idAuth0 = jwt.getSubject();
		return ResponseEntity.ok(sucursalService.createSucursal(idAuth0, sucursalDTO));
	}

	@PutMapping("/{idSucursal}/edit")
	public ResponseEntity<SucursalProfileResponse> editSucursal(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idSucursal, @RequestBody SucursalDTO sucursalDTO) throws Auth0Exception {
		var idAuth0 = jwt.getSubject();
		return ResponseEntity.ok(sucursalService.editSucursal(idAuth0, idSucursal, sucursalDTO));
	}

	@GetMapping("/{idSucursal}")
	public ResponseEntity<SucursalProfileResponse> sucursalProfile(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idSucursal) throws Auth0Exception {
		var idAuth0 = jwt.getSubject();
		return ResponseEntity.ok(sucursalService.getSucursalProfile(idAuth0, idSucursal));
	}

	@DeleteMapping("/{idSucursal}")
	public ResponseEntity<ApiResponse> deleteSucursal(@AuthenticationPrincipal Jwt jwt, @PathVariable Long idSucursal)
			throws Auth0Exception {
		var idAuth0 = jwt.getSubject();
		sucursalService.deleteSucursal(idAuth0, idSucursal);
		return ResponseEntity.ok().body(new ApiResponse(true, "Sucursal deleted successfully"));
	}

	@PostMapping("/{idSucursal}/invite/{idUsuario}/role/{idRol}")
	public ResponseEntity<ApiResponse> inviteUsuarioToSucursalWithRol(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idSucursal, @PathVariable Long idUsuario, @PathVariable List<Long> idRol) {
		var idAuth0 = jwt.getSubject();
		sucursalService.inviteUserWithRoles(idAuth0, idSucursal, idUsuario, idRol);
		return ResponseEntity.ok().body(new ApiResponse(true, "Email con invitacion enviado"));
	}

	@PutMapping("/{idSucursal}/users/{idUsuario}/roles/{idsRol}/edit")
	public ResponseEntity<ApiResponse> editUsuarioRoles(@AuthenticationPrincipal Jwt jwt, @PathVariable Long idSucursal,
			@PathVariable Long idUsuario, @PathVariable List<Long> idsRol) {
		var idAuth0 = jwt.getSubject();
		sucursalService.editUserRoles(idAuth0, idSucursal, idUsuario, idsRol);
		return ResponseEntity.ok().body(new ApiResponse(true, "Usuario con roles nuevos editado"));
	}

	@DeleteMapping("/{idSucursal}/users/{idUsuario}/delete")
	public ResponseEntity<SucursalProfileResponse> deleteUserFromSucursal(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idSucursal, @PathVariable Long idUsuario) {
		var idAuth0 = jwt.getSubject();
		return ResponseEntity.ok(sucursalService.deleteUserFromSucursal(idAuth0, idSucursal, idUsuario));
	}

	@GetMapping("/{idSucursal}/users/{idUsuario}/roles")
	public ResponseEntity<List<RolDTO>> getUsuarioRoles(@AuthenticationPrincipal Jwt jwt, @PathVariable Long idSucursal,
			@PathVariable Long idUsuario) {
		var idAuth0 = jwt.getSubject();
		return ResponseEntity.ok(usuarioService.getUserRoles(idAuth0, idSucursal, idUsuario));
	}
}
