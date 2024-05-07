package com.inventoMate.models;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Rol;
import com.inventoMate.entities.Sucursal;
import com.inventoMate.entities.Usuario;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailSender {
	
	@Autowired
    private JavaMailSender javaMailSender;
	@Autowired
    private TemplateEngine templateEngine;

	public void sendSucursalInvitation(Empresa empresa, Sucursal sucursal, Usuario usuario, List<Rol> roles, String token) {
		try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(usuario.getEmail());
            helper.setSubject("Invitacion a " + sucursal.getNombre());
           
            Context context = new Context();
            context.setVariable("empresa", empresa);
            context.setVariable("usuario", usuario);
            context.setVariable("sucursal", sucursal);
            context.setVariable("roles", roles);
            context.setVariable("token", token);
            String contenidoHtml = templateEngine.process("SucursalInvitation", context);
            helper.setText(contenidoHtml, true);
            javaMailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Error al enviar el correo: " + e.getMessage(), e);
        }
	}
	
}
