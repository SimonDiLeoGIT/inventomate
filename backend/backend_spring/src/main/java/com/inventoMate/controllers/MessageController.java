package com.inventoMate.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventoMate.models.Message;
import com.inventoMate.services.MessageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/messages")
@CrossOrigin("*")
public class MessageController {

	private final MessageService messageService;

	@GetMapping("/public")
	public Message getPublic() {
		return messageService.getPublicMessage();
	}

	@GetMapping("/protected")
	public Message getProtected() {
		return messageService.getProtectedMessage();
	}

	@GetMapping("/admin")
	@PreAuthorize("hasAuthority('admin')")
	public Message getAdmin() {
		return messageService.getAdminMessage();
	}
}
