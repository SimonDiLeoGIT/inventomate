package com.inventoMate;

import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.dtos.empresas.EmpresaDTO;
import com.inventoMate.dtos.users.OwnerDTO;
import com.inventoMate.repositories.EmpresaRepository;
import com.inventoMate.repositories.UsuarioRepository;
import com.inventoMate.services.EmpresaService;
import com.inventoMate.services.UsuarioService;
import com.inventoMate.services.impl.EmpresaServiceImpl;

@ExtendWith(MockitoExtension.class)
public class TestCreateEmpresa {

	@Mock
	private EmpresaService empresaServiceMock;
	@Mock
	private UsuarioService usuarioServiceMock;
	@Mock
	private EmpresaRepository empresaRepositoryMock;
	@Mock
	private UsuarioRepository usuarioRepositoryMock;
	@Mock
	private ModelMapper modelMapperMock;

	@InjectMocks
	private EmpresaServiceImpl empresaService;

	@Test
	public void testCreateEmpresa() throws Auth0Exception {
		// Datos de prueba
		String idAuth0 = "idAuth0";
		EmpresaDTO empresaDTO = new EmpresaDTO();
		empresaDTO.setNombreEmpresa("Nombre de prueba");
		empresaDTO.setDescripcion("Descripción de prueba");
		empresaDTO.setLogo("logo.png");
		OwnerDTO ownerDTO = new OwnerDTO();
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

	/*
	 * @Test public void testGetEmpresaByOwnerAuht0Id() throws Auth0Exception { //
	 * Datos simulados String idAuth0 = "idAuth0"; Long userId = 1L;
	 * 
	 * // Simulación de UsuarioDTO OwnerDTO ownerSimulado = new OwnerDTO();
	 * ownerSimulado.setIdUsuario(userId); ownerSimulado.setIdAuth0(idAuth0);
	 * 
	 * // Simulación de EmpresaDTO EmpresaDTO empresaDTOsimulada = new EmpresaDTO();
	 * empresaDTOsimulada.setIdEmpresa(1L);
	 * empresaDTOsimulada.setOwner(ownerSimulado);
	 * 
	 * // Simulación de Usuario Usuario usuarioSimulado = new Usuario();
	 * usuarioSimulado.setIdUsuario(userId); usuarioSimulado.setIdAuth0(idAuth0);
	 * 
	 * // Simulación de Empresa Empresa empresaSimulada = new Empresa();
	 * empresaSimulada.setIdEmpresa(1L); empresaSimulada.setOwner(usuarioSimulado);
	 * 
	 * // Comportamiento esperado del mock de UsuarioRepository
	 * when(usuarioRepositoryMock.findByIdAuth0(idAuth0)).thenReturn(Optional.of(
	 * usuarioSimulado));
	 * 
	 * // Comportamiento esperado del mock de EmpresaRepository
	 * when(empresaRepositoryMock.findByOwner(Mockito.any(Usuario.class))).
	 * thenReturn(Optional.of(empresaSimulada));
	 * 
	 * // Ejecución del método bajo prueba EmpresaDTO empresaObtenida =
	 * empresaService.getEmpresaByOwnerAuht0Id(idAuth0);
	 * 
	 * // Verificación Assertions.assertNotNull(empresaObtenida);
	 * Assertions.assertEquals(1L, empresaObtenida.getIdEmpresa()); }
	 */
}
