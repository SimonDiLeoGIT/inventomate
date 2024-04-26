package com.inventoMate.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.dtos.users.CreateUserWithRolDTO;
import com.inventoMate.dtos.users.UsuarioDTO;
import com.inventoMate.payload.ApiResponse;
import com.inventoMate.payload.EditUserRequest;
import com.inventoMate.services.UserAuth0Service;
import com.inventoMate.services.UsuarioService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@AllArgsConstructor
@RequestMapping("api/users")
@CrossOrigin("*")
@Validated
public class UserController {

	private final UserAuth0Service userService;
	private final UsuarioService usuarioService;

	@PostMapping("/create")
	public ResponseEntity<?> createUserWithRole(@RequestBody CreateUserWithRolDTO user) throws Auth0Exception {
		return ResponseEntity.ok(userService.createUserWithRole(user.getEmail(), user.getRoleId(), user.getPassword()));
	}

	@PostMapping("/sign-up")
	public ResponseEntity<UsuarioDTO> singUp(@AuthenticationPrincipal Jwt jwt) throws Auth0Exception {
		var id = jwt.getSubject();
		return ResponseEntity.ok(usuarioService.createUsuario(id));
	}

	@GetMapping("/me")
	public ResponseEntity<UsuarioDTO> getProfile(@AuthenticationPrincipal Jwt jwt) throws Auth0Exception {
		var id = jwt.getSubject();
		return ResponseEntity.ok(usuarioService.getProfileCurrentUser(id));
	}
	
	@PutMapping("/edit")
	public ResponseEntity<UsuarioDTO> editUserPrincipal(@AuthenticationPrincipal Jwt jwt, @RequestBody @Valid EditUserRequest usuario) throws Auth0Exception {
		var id = jwt.getSubject();
		return ResponseEntity.ok(usuarioService.updateUser(id,usuario));
	}
	
	@GetMapping("/edit/password")
	public ResponseEntity<?>  editPasswordUserPrincipal(@AuthenticationPrincipal Jwt jwt) throws Auth0Exception {
		var id = jwt.getSubject();
		return ResponseEntity.ok(userService.editPasswordRequest(id));
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<?>  deleteUserPrincipal(@AuthenticationPrincipal Jwt jwt) throws Auth0Exception {
		var id = jwt.getSubject();
		usuarioService.deleteUserPrincipal(id);
		userService.deleteUserByAuth0Id(id,jwt.getTokenValue());
		return ResponseEntity.ok().body(new ApiResponse(true, "User deleted successfully"));
	}

}
