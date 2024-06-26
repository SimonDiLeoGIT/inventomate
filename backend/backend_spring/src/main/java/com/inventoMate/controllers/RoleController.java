package com.inventoMate.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.dtos.roles.RolDTO;
import com.inventoMate.dtos.roles.RolToUserDTO;
import com.inventoMate.dtos.roles.RoleDTO;
import com.inventoMate.dtos.roles.RolePermissionsDTO;
import com.inventoMate.services.RolService;
import com.inventoMate.services.RoleAuth0Service;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/roles")
public class RoleController {

	private final RoleAuth0Service roleService;
	private final RolService rolService;

	@GetMapping
	public ResponseEntity<List<RolDTO>> getAll() throws Auth0Exception {
		return ResponseEntity.ok(rolService.getAll());
	}

	@GetMapping("/{roleId}")
	public ResponseEntity<RoleDTO> getRoleById(@PathVariable String roleId) throws Auth0Exception {
		return ResponseEntity.ok(roleService.getRolById(roleId));
	}

	@GetMapping("/{roleId}/permissions")
	public ResponseEntity<RolePermissionsDTO> getPermissionsRole(@PathVariable String roleId) throws Auth0Exception {
		return ResponseEntity.ok(roleService.getPermissionsRole(roleId));
	}

	@PutMapping()
	public ResponseEntity<HttpStatus> assignRolToUser(@RequestBody RolToUserDTO rolToUserDTO) throws Auth0Exception {
		return ResponseEntity.ok(roleService.assignRolToUser(rolToUserDTO.getRolId(), rolToUserDTO.getUserId()));
	}

}
