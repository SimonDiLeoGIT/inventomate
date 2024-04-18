package com.inventoMate.services.impl;

import java.util.LinkedList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.auth0.exception.Auth0Exception;
import com.inventoMate.dtos.empresas.EmpresaDTO;
import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Rol;
import com.inventoMate.entities.Usuario;
import com.inventoMate.exceptions.ResourceAlreadyExistsException;
import com.inventoMate.exceptions.ResourceNotFoundException;
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
	private final UsuarioRepository usuarioRepository;
	private final RolRepository rolRepository;
	private final RoleAuth0Service roleAuth0Service;
	private final ModelMapper modelMapper;
	
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
	public EmpresaDTO getEmpresaByOwnerAuht0Id(String IdAuth0) throws Auth0Exception {
		
		Usuario owner = usuarioRepository.findByIdAuth0(IdAuth0).orElseThrow(() -> 
		new ResourceNotFoundException("Usuario","IdAuth0",IdAuth0));
		
		Empresa empresa = empresaRepository.findByOwner(owner).orElseThrow(() -> 
		new ResourceNotFoundException("Empresa","owner",owner.getIdUsuario().toString()));
		
		return modelMapper.map(empresa, EmpresaDTO.class);
	}

}
