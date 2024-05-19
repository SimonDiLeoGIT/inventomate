package com.inventoMate.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.dtos.empresas.EditEmpresaRequest;
import com.inventoMate.dtos.empresas.EmpresaDTO;
import com.inventoMate.dtos.empresas.EmpresaProfileResponse;
import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Rol;
import com.inventoMate.entities.Usuario;
import com.inventoMate.exceptions.ResourceAlreadyExistsException;
import com.inventoMate.exceptions.ResourceNotFoundException;
import com.inventoMate.mapper.EmpresaMapper;
import com.inventoMate.repositories.EmpresaRepository;
import com.inventoMate.repositories.RolRepository;
import com.inventoMate.repositories.UsuarioRepository;
import com.inventoMate.services.EmpresaService;
import com.inventoMate.services.RoleAuth0Service;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class EmpresaServiceImpl implements EmpresaService {

	private final EmpresaRepository empresaRepository;
	private final EmpresaMapper mapper;
	private final UsuarioRepository usuarioRepository;
	private final RolRepository rolRepository;
	private final RoleAuth0Service roleAuth0Service;

	@Override
	@Transactional
	public EmpresaDTO createEmpresa(String IdAuth0, EmpresaDTO empresaDTO) throws Auth0Exception {
		// recupero el usuario de la base de datos por el Id de auth0
		Usuario owner = usuarioRepository.findByIdAuth0(IdAuth0)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "IdAuth0", IdAuth0));

		// verifico que no sea dueño de una empresa
		if (owner.esDueñoDeEmpresa()) {
			throw new ResourceAlreadyExistsException("Empresa", "id_owner", owner.getIdUsuario().toString());
		}

		// recupero el rol de EX para el owner
		Rol rol = rolRepository.findByNombreRol("Executive Manager")
				.orElseThrow(() -> new ResourceNotFoundException("Rol", "nombre_rol", "Executive Manager"));

		// seteo atributos de la empresa
		Empresa empresa = mapper.mapToEmpresa(empresaDTO);

		// creo la empresa en el owner
		owner.crearEmpresa(empresa, rol);

		// seteo y guardo el rol del usuario en auth0
		roleAuth0Service.assignRolToUser(rol.getIdRolAuth0(), IdAuth0);

		empresaRepository.save(empresa);
		usuarioRepository.save(owner);

		return mapper.mapToEmpresaDTO(empresa);
	}

	@Override
	public EmpresaProfileResponse getEmpresaProfile(String idAuth0) {
		Usuario usuario = usuarioRepository.findByIdAuth0(idAuth0)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "IdAuth0", idAuth0));

		Empresa empresa = usuario.obtenerEmpresa();

		return mapper.mapToEmpresaProfileResponse(empresa, empresa.getSucursales(), usuario.esDueñoDeEmpresa());
	}

	@Override
	public EmpresaProfileResponse updateEmpresa(String idAuth0, EditEmpresaRequest editEmpresaRequest) {
		Usuario usuario = usuarioRepository.findByIdAuth0(idAuth0)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "IdAuth0", idAuth0));

		Empresa empresa = empresaRepository.findByOwner(usuario).orElseThrow(
				() -> new ResourceNotFoundException("Empresa", "owner", usuario.getIdUsuario().toString()));

		mapper.mapEditRequestToEmpresa(empresa, editEmpresaRequest);

		empresaRepository.save(empresa);

		return mapper.mapToEmpresaProfileResponse(empresa, empresa.getSucursales(), true);
	}

	@Override
	@Transactional
	public void deleteEmpresa(String idAuth0) throws Auth0Exception {
		// recupero el owner
		Usuario owner = usuarioRepository.findByIdAuth0(idAuth0)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "IdAuth0", idAuth0));

		// recupero la empresa
		Empresa empresa = owner.getEmpresa();

		// obtengo los empleados de la empresa
		List<Usuario> empleados = empresa.obtenerEmpleados();
		empleados.add(owner);

		// elimino roles de auth0 de empleados
		roleAuth0Service.revokeUsersAuth0Roles(empleados);

		// elimino empresa
		owner.eliminarEmpresa();

		// guardo los cambios
		usuarioRepository.saveAll(empleados);
		empresaRepository.delete(empresa);
	}

}
