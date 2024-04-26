package com.inventoMate.dtos.users;

import java.util.List;

import com.inventoMate.dtos.empresas.EmpresaDTO;
import com.inventoMate.dtos.roles.RolDTO;
import com.inventoMate.dtos.sucursales.SucursalDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {

    private Long idUsuario;

    private String nickname;

    private String picture;
    
    private String email;
	
    private EmpresaDTO empresa; 
    
    private SucursalDTO sucursal;
    
    private List<RolDTO> roles;

}
