package com.inventoMate.services.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.dtos.empresas.EmpresaDTO;
import com.inventoMate.dtos.sucursales.SucursalDTO;
import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Rol;
import com.inventoMate.entities.Sucursal;
import com.inventoMate.entities.Usuario;
import com.inventoMate.exceptions.ResourceAlreadyExistsException;
import com.inventoMate.exceptions.ResourceNotFoundException;
import com.inventoMate.payload.EditEmpresaRequest;
import com.inventoMate.payload.EmpresaProfileResponse;
import com.inventoMate.repositories.EmpresaRepository;
import com.inventoMate.repositories.RolRepository;
import com.inventoMate.repositories.SucursalRepository;
import com.inventoMate.repositories.UsuarioRepository;
import com.inventoMate.services.EmpresaService;
import com.inventoMate.services.RoleAuth0Service;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class EmpresaServiceImpl implements EmpresaService {

	private final EmpresaRepository empresaRepository;
	private final UsuarioRepository usuarioRepository;
	private final RolRepository rolRepository;
	private final RoleAuth0Service roleAuth0Service;
	private final ModelMapper modelMapper;
	private final SucursalRepository sucursalRepository;
	
	@Override
	@Transactional
	public EmpresaDTO createEmpresa(String IdAuth0, EmpresaDTO empresaDTO) throws Auth0Exception{
		
		// recupero el usuario de la base de datos por el Id de auth0
		Usuario owner = usuarioRepository.findByIdAuth0(IdAuth0).orElseThrow(() -> 
			new ResourceNotFoundException("Usuario","IdAuth0",IdAuth0));
		
		// verifico que no sea dueño de otra empresa
		if(empresaRepository.existsByOwner(owner)) {
			throw new ResourceAlreadyExistsException("Empresa", "id_owner", owner.getIdUsuario().toString());
		}
		
		//seteo atributos de la empresa
		Empresa empresa = modelMapper.map(empresaDTO, Empresa.class);
		empresa.setOwner(owner);
		// guardo la empresa
		empresaRepository.save(empresa);
		
		// recupero el rol de EX para el owner
		Rol rol = rolRepository.findByNombreRol("Executive Manager").orElseThrow(() -> 
		new ResourceNotFoundException("Rol","nombre_rol","Executive Manager"));
		
		// seteo en el owner el rol y empresa, lo guardo
		List<Rol> roles = owner.getRoles();
		if(roles == null) {
			roles = new LinkedList<Rol>();
		}
		roles.add(rol);
		owner.setEmpresa(empresa);
		owner.setRoles(roles);
		usuarioRepository.save(owner);

		// seteo y guardo el rol del usuario en auth0
		roleAuth0Service.assignRolToUser(rol.getIdRolAuth0(), IdAuth0);
		
		return modelMapper.map(empresa, EmpresaDTO.class);
	}

	@Override
	public EmpresaProfileResponse getEmpresaProfile(String idAuth0) {
		
		Usuario usuario = usuarioRepository.findByIdAuth0(idAuth0).orElseThrow(() -> 
		new ResourceNotFoundException("Usuario","IdAuth0",idAuth0));
		
		boolean owner = false;
		// si es owner
		Empresa empresa = empresaRepository.findByOwner(usuario).orElse(null);
		if(empresa != null) owner = true;
		// si es empleado
		Sucursal sucursal = sucursalRepository.findByUsuariosContains(usuario).orElse(null);
		if(sucursal != null && !owner)
			empresa = empresaRepository.findBySucursalesContains(sucursal).orElse(null);
		// obtengo sucursales
		List<Sucursal> sucursales = null;
		if(empresa != null) {
			sucursales = sucursalRepository.findAllByEmpresa(empresa).orElse(null);
		}
		
		return EmpresaProfileResponse.builder()
				.empresa(empresa != null? modelMapper.map(empresa, EmpresaDTO.class) : null)
				.sucursales(sucursales != null? 
						sucursales.stream().map(sucu -> modelMapper
									.map(sucu, SucursalDTO.class))
						.collect(Collectors.toList()) : null)
				.isOwner(owner)
				.build();
	}

	@Override
	public EmpresaProfileResponse updateEmpresa(String idAuth0, EditEmpresaRequest editEmpresaRequest) {
		
		Usuario usuario = usuarioRepository.findByIdAuth0(idAuth0).orElseThrow(() -> 
		new ResourceNotFoundException("Usuario","IdAuth0",idAuth0));
		
		Empresa empresa = empresaRepository.findByOwner(usuario).orElseThrow(() -> 
		new ResourceNotFoundException("Empresa","owner",usuario.getIdUsuario().toString()));
		
		empresa.setDescripcion(editEmpresaRequest.getDescripcion());
		empresa.setNombreEmpresa(editEmpresaRequest.getNombreEmpresa());
		empresa.setLogo(editEmpresaRequest.getLogo());
		
		empresaRepository.save(empresa);
		
		List<Sucursal> sucursales = null;
		if(empresa != null) {
			sucursales = sucursalRepository.findAllByEmpresa(empresa).orElse(null);
		}
		
		return EmpresaProfileResponse.builder()
				.empresa(modelMapper.map(empresa, EmpresaDTO.class))
				.sucursales(sucursales != null? 
						sucursales.stream().map(sucu -> modelMapper
									.map(sucu, SucursalDTO.class))
						.collect(Collectors.toList()) : null)
				.isOwner(true)
				.build();
	}

	@Override
	@Transactional
	public void deleteEmpresa(String idAuth0) throws Auth0Exception {
		// recupero el owner
		Usuario owner = usuarioRepository.findByIdAuth0(idAuth0).orElseThrow(() -> 
		new ResourceNotFoundException("Usuario","IdAuth0",idAuth0));
		// recupero la empresa
		Empresa empresa = empresaRepository.findByOwner(owner).orElseThrow(() -> 
		new ResourceNotFoundException("Empresa","owner",owner.getIdUsuario().toString()));
		// seteo atributos empresa y roles como nulos
		owner.setEmpresa(null);	
		revokeUserRoles(owner);
		// por cada sucursal
		empresa.getSucursales().forEach(item -> {
			// por cada empleado de sucursal
			item.getUsuarios().forEach(usuario -> {
				System.out.println(usuario.getNickname());
				// saco sucursal a la que pertenecia
				usuario.setSucursal(null);
				// le quito todos los roles y permisos
				try {
					revokeUserRoles(usuario);
				} catch (Auth0Exception e) {
					throw new ResourceNotFoundException("user Auth0", "id", idAuth0);
				}
				// guardo al empleado
				usuarioRepository.save(usuario);
			});
		});
		// guardo el owner
		usuarioRepository.save(owner);
		// elimino la empresa
		empresaRepository.delete(empresa);
	}
	
	private void revokeUserRoles(Usuario usuario) throws Auth0Exception {
		var roles = rolRepository.findAllByUsuariosContains(usuario).orElse(null);
		if (roles != null) {
			roleAuth0Service.unAssignRolesToUser(usuario.getIdAuth0(), usuario.getRoles());
			usuario.setRoles(null);
		}
	}

}
