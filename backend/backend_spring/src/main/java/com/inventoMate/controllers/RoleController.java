package com.inventoMate.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.dtos.roles.RoleDTO;
import com.inventoMate.dtos.roles.RolePermissionsDTO;
import com.inventoMate.services.impl.RoleAuth0ServiceImpl;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/roles")
public class RoleController{

	private final RoleAuth0ServiceImpl roleService;
	
	@GetMapping
	public ResponseEntity<List<RoleDTO>> getAll() throws Auth0Exception {
		return ResponseEntity.ok(roleService.getAllRoles());
	}
	
	@GetMapping("/{roleId}")
	public ResponseEntity<RoleDTO> getRoleById(@PathVariable String roleId) throws Auth0Exception {
		return ResponseEntity.ok(roleService.getRolById(roleId));
	}

	@GetMapping("/{roleId}/permissions")
	public ResponseEntity<RolePermissionsDTO> getPermissionsRole(@PathVariable String roleId) throws Auth0Exception {
		return ResponseEntity.ok(roleService.getPermissionsRole(roleId));
	}
	
	@PutMapping("/{roleId}/{userId}")
	public ResponseEntity<?> assignRolToUser(@PathVariable String roleId, @PathVariable String userId) throws Auth0Exception {
		return ResponseEntity.ok(roleService.assignRolToUser(roleId,userId));
	}
	
	@GetMapping("/user")
	public ResponseEntity<Object> getUsers() throws Auth0Exception {
		return ResponseEntity.ok(roleService.getUsers());
	}
	
}
