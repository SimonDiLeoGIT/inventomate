package com.inventoMate.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.inventoMate.entities.InvitacionSucursal;
import com.inventoMate.payload.ApiResponse;
import com.inventoMate.services.InvitacionService;
import com.inventoMate.services.SucursalService;

import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/invitaciones")
@AllArgsConstructor
public class InvitacionController {

	private final InvitacionService invitacionService;
	private final SucursalService sucursalService;

	@GetMapping("/aceptar/{token}")
	public ModelAndView aceptarInvitacion(@PathVariable String token) {
		InvitacionSucursal invitacionSucursal = invitacionService.getInvitacionByToken(token);
		sucursalService.addUserWithRoles(invitacionSucursal);
		return new ModelAndView(new RedirectView("http://localhost:5173/"));
	}

	@GetMapping("/rechazar/{token}")
	public ResponseEntity<ApiResponse> rechazarInvitacion(@PathVariable String token) {
		invitacionService.getInvitacionByToken(token);
		return ResponseEntity.ok().body(new ApiResponse(true, "invitacion rechazada"));
	}
}
