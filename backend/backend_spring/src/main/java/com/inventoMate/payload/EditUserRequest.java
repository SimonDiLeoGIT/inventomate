package com.inventoMate.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditUserRequest {

    @Size(min = 4, max = 25, message = "El apodo debe tener entre 4 y 25 caracteres")
    @Pattern(regexp = "^(?!(?:.*\\s){3})[a-zA-Z\\s]+", message = "El apodo solo puede contener letras y hasta 2 espacios")
    private String nickname;
    
    private String picture;
    
    @Email(message = "Debe ser una dirección de correo electrónico válida")
    private String email;
    
}