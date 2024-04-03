package com.inventoMate.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.dtos.users.CreateUserWithRolDTO;
import com.inventoMate.services.UserAuth0Service;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("api/users")
public class UserController {

	private final UserAuth0Service userService;
	
	@PostMapping("/create")
	public ResponseEntity<?> createUserWithRole(@RequestBody CreateUserWithRolDTO user) throws Auth0Exception{
		return ResponseEntity.ok(userService.createUserWithRole(user.getEmail(),user.getRoleId(),user.getPassword()));
	}
}
