package com.inventoMate.dtos.users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OwnerDTO {
	
    private Long idUsuario;

    private String idAuth0;

    private String nickname;

    private String email;
	
}
