package com.inventoMate;

import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.*;
import com.inventoMate.dtos.empresas.EmpresaDTO;
import com.inventoMate.dtos.users.OwnerDTO;
import com.inventoMate.dtos.users.UsuarioDTO;
import com.inventoMate.repositories.UsuarioRepository;
import com.inventoMate.services.EmpresaService;
import com.inventoMate.services.UsuarioService;
import com.inventoMate.services.impl.UsuarioServiceImpl;

@ExtendWith(MockitoExtension.class)
public class testCreateEmpresa {
	
  	@Mock
    private EmpresaService empresaServiceMock;

    @Test
    public void testCreateEmpresa() throws Auth0Exception {
        // Datos de prueba
        String idAuth0 = "idAuth0";
        EmpresaDTO empresaDTO = new EmpresaDTO();
        empresaDTO.setNombreEmpresa("Nombre de prueba");
        empresaDTO.setDescripcion("Descripción de prueba");
        empresaDTO.setLogo("logo.png");
        OwnerDTO ownerDTO = new OwnerDTO();
        ownerDTO.setIdAuth0(idAuth0);
        empresaDTO.setOwner(ownerDTO);

        // Comportamiento esperado del mock
        EmpresaDTO empresaCreada = new EmpresaDTO();
        empresaCreada.setIdEmpresa(1L); // Supongamos que la empresa recién creada tiene ID 1
        when(empresaServiceMock.createEmpresa(idAuth0, empresaDTO)).thenReturn(empresaCreada);

        // Ejecución del método bajo prueba
        EmpresaDTO empresaCreadaResultado = empresaServiceMock.createEmpresa(idAuth0, empresaDTO);

        // Verificación
        Assertions.assertEquals(1L, empresaCreadaResultado.getIdEmpresa());
    }
}
