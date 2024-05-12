package com.inventoMate.models;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Informe;
import com.inventoMate.entities.Rol;
import com.inventoMate.entities.Sucursal;
import com.inventoMate.entities.Usuario;

import jakarta.mail.internet.MimeMessage;

@Component
public class EmailSender {

    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private TemplateEngine templateEngine;

    public void sendSucursalInvitation(Empresa empresa, Sucursal sucursal, Usuario usuario, List<Rol> roles,
            String token) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("grupo3SIP2024@gmail.com");
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

    public void sendInformeNotification(Empresa empresa, Sucursal sucursal, Informe informe,
            Usuario empleado) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("grupo3SIP2024@gmail.com");
            helper.setTo(empleado.getEmail());
            helper.setSubject("Culminacion de " + informe.getTipoInforme().getName());

            Context context = new Context();
            context.setVariable("empresa", empresa);
            context.setVariable("usuario", empleado);
            context.setVariable("sucursal", sucursal);
            context.setVariable("informe", informe);

            String contenidoHtml = templateEngine.process("InformeNotification", context);
            helper.setText(contenidoHtml, true);
            javaMailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Error al enviar el correo: " + e.getMessage(), e);
        }
    }
}
