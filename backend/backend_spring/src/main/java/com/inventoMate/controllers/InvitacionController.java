package com.inventoMate.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.inventoMate.entities.InvitacionSucursal;
import com.inventoMate.payload.ApiResponse;
import com.inventoMate.services.InvitacionService;
import com.inventoMate.services.SucursalService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/invitaciones")
@AllArgsConstructor
public class InvitacionController {

	private final InvitacionService invitacionService;
	private final SucursalService sucursalService;

	@Value("${invitation.redirect.url}")
	private String redirectUrl;

	@GetMapping("/aceptar/{token}")
	public ModelAndView aceptarInvitacion(@PathVariable String token) {
		InvitacionSucursal invitacionSucursal = invitacionService.getInvitacionByToken(token);
		sucursalService.addUserWithRoles(invitacionSucursal);
		return new ModelAndView(new RedirectView(redirectUrl));
	}

	@GetMapping("/rechazar/{token}")
	public ResponseEntity<ApiResponse> rechazarInvitacion(@PathVariable String token) {
		invitacionService.getInvitacionByToken(token);
		return ResponseEntity.ok().body(new ApiResponse(true, "invitacion rechazada"));
	}
}
