package com.inventoMate.services;

import org.springframework.stereotype.Service;

import com.inventoMate.models.Message;

@Service
public class MessageService {

	public Message getPublicMessage() {
		final var text = "This is a public message.";

		return Message.from(text);
	}

	public Message getProtectedMessage() {
		final var text = "This is a protected message.";

		return Message.from(text);
	}

	public Message getAdminMessage() {
		final var text = "This is an admin message.";

		return Message.from(text);
	}
}
