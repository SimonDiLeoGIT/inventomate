package com.inventoMate.dtos.users;

import java.util.List;

import com.inventoMate.dtos.roles.RolDTO;
import com.inventoMate.dtos.sucursales.SucursalDTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {

    private Long idUsuario;

    @NotNull
    private String idAuth0;

    private String nickname;

    @NotBlank
    @Email
    private String email;
	
    @Null
    private SucursalDTO sucursal;
    
    @Null
    private List<RolDTO> roles;

}
