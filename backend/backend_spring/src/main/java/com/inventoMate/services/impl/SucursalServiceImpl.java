package com.inventoMate.services.impl;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.inventoMate.dtos.empresas.EmpresaDTO;
import com.inventoMate.dtos.sucursales.SucursalDTO;
import com.inventoMate.dtos.sucursales.SucursalProfileResponse;
import com.inventoMate.dtos.users.UsuarioDTO;
import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.InvitacionSucursal;
import com.inventoMate.entities.Rol;
import com.inventoMate.entities.Sucursal;
import com.inventoMate.entities.Usuario;
import com.inventoMate.exceptions.ResourceAlreadyExistsException;
import com.inventoMate.exceptions.ResourceNotFoundException;
import com.inventoMate.repositories.EmpresaRepository;
import com.inventoMate.repositories.RolRepository;
import com.inventoMate.repositories.SucursalRepository;
import com.inventoMate.repositories.UsuarioRepository;
import com.inventoMate.services.EmailSenderService;
import com.inventoMate.services.InvitacionService;
import com.inventoMate.services.SucursalService;
import com.inventoMate.services.UserAuth0Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SucursalServiceImpl implements SucursalService{

	private final SucursalRepository sucursalRepository;
	private final UsuarioRepository usuarioRepository;
	private final EmpresaRepository empresaRepository;
	private final RolRepository rolRepository;
	private final ModelMapper mapper;
	private final EmailSenderService emailSender;
	private final InvitacionService invitacionService;
	private final UserAuth0Service userAuth0Service;
	@Override
	public SucursalProfileResponse createSucursal(String idAuth0, SucursalDTO sucursalDTO) {
		
		Empresa empresa = findEmpresaByIdAuth0(idAuth0);
		
		Sucursal sucursal = Sucursal.builder().empresa(empresa)
				.usuarios(Collections.emptyList())
				.idSucCliente(sucursalDTO.getIdSucCliente())
				.nombre(sucursalDTO.getNombre())
				.ubicacion(sucursalDTO.getUbicacion())
				.build();
		
		sucursalRepository.save(sucursal);
		
		return mapSucursalToSucursalProfile(empresa, sucursal);
	}

	@Override
	public SucursalProfileResponse editSucursal(String idAuth0, Long idSucursal, SucursalDTO sucursalDTO) {
		
		Empresa empresa = findEmpresaByIdAuth0(idAuth0);
		
		Sucursal sucursal = empresa.getSucursales().stream().filter(s -> s.getIdSucursal().equals(idSucursal)).findFirst()
				.orElseThrow(
						() -> new ResourceNotFoundException("sucursal-empresa", "id_sucursal (empresa)", idSucursal.toString()));
		
		sucursal.setIdSucCliente(sucursalDTO.getIdSucCliente());
		sucursal.setNombre(sucursalDTO.getNombre());
		sucursal.setUbicacion(sucursalDTO.getUbicacion());
		
		sucursalRepository.save(sucursal);
		
		return mapSucursalToSucursalProfile(empresa, sucursal);
	}

	@Override
	public SucursalProfileResponse getSucursalProfile(String idAuth0, Long idSucursal) {
		
		Empresa empresa = findEmpresaByIdAuth0(idAuth0);
		
		Sucursal sucursal = empresa.getSucursales().stream().filter(s -> s.getIdSucursal().equals(idSucursal)).findFirst()
				.orElseThrow(
						() -> new ResourceNotFoundException("sucursal-empresa", "id_sucursal (empresa)", idSucursal.toString()));
		
		return mapSucursalToSucursalProfile(empresa, sucursal);
	}
	
	private SucursalProfileResponse mapSucursalToSucursalProfile(Empresa empresa, Sucursal sucursal) {
		return SucursalProfileResponse.builder()
				.empresa(mapper.map(empresa, EmpresaDTO.class))
				.sucursal(mapper.map(sucursal, SucursalDTO.class))
				.usuarios(sucursal.getUsuarios().stream().map(us -> mapper.map(us, UsuarioDTO.class))
						.collect(Collectors.toList()))
				.build();
	}
	
	private Empresa findEmpresaByIdAuth0(String idAuth0){
		
		Usuario usuario = usuarioRepository.findByIdAuth0(idAuth0)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_auth0", idAuth0));
		return empresaRepository.findByOwner(usuario).orElseThrow(
				() -> new ResourceNotFoundException("Empresa", "owner", usuario.getIdUsuario().toString()));
		
	}

	@Override
	public void deleteSucursal(String idAuth0, Long idSucursal) {
		
		Empresa empresa = findEmpresaByIdAuth0(idAuth0);
		
		Sucursal sucursal = empresa.getSucursales().stream().filter(s -> s.getIdSucursal().equals(idSucursal)).findFirst()
				.orElseThrow(
						() -> new ResourceNotFoundException("sucursal-empresa", "id_sucursal (empresa)", idSucursal.toString()));
		
		empresa.getSucursales().remove(sucursal);
		
		sucursalRepository.delete(sucursal);
		
		empresaRepository.save(empresa);
		
	}

	@Override
	public void inviteUserWithRoles(String idAuth0, Long idSucursal, Long idUsuario, List<Long> idsRol) {
		
		Empresa empresa = findEmpresaByIdAuth0(idAuth0);
		
		Sucursal sucursal = empresa.getSucursales().stream().filter(s -> s.getIdSucursal().equals(idSucursal)).findFirst()
				.orElseThrow(
						() -> new ResourceNotFoundException("sucursal-empresa", "id_sucursal (empresa)", idSucursal.toString()));
		
		Usuario usuario = usuarioRepository.findById(idUsuario)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_usuario", idUsuario.toString()));
		
		List<Rol> roles = idsRol.stream()
				.map(idRol -> rolRepository.findById(idRol)
						.orElseThrow(() -> new ResourceNotFoundException("Rol", "id_rol", idRol.toString())))
				.collect(Collectors.toList());
		
		String token = invitacionService.generarTokenInvitacion(idUsuario, idSucursal, idsRol);
		
		emailSender.sendSucursalInvitation(empresa,sucursal,usuario,roles,token);
		
	}

	@Override
	public void addUserWithRoles(InvitacionSucursal invitacionSucursal) {
		
		Sucursal sucursal = sucursalRepository.findById(invitacionSucursal.getIdSucursal())
				.orElseThrow(() -> new ResourceNotFoundException("Sucursal", "id_sucursal", invitacionSucursal.getIdSucursal().toString()));
		
		Usuario usuario = usuarioRepository.findById(invitacionSucursal.getIdUsuarioInvitado())
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_usuario", invitacionSucursal.getIdUsuarioInvitado().toString()));
		
		if(usuario.getSucursal() != null) {
			throw new ResourceAlreadyExistsException("Usuario", "id_sucursal", usuario.getSucursal().getIdSucursal().toString());
		}
		
		List<Rol> roles = invitacionSucursal.getRoles().stream()
				.map(idRol -> rolRepository.findById(idRol)
						.orElseThrow(() -> new ResourceNotFoundException("Rol", "id_rol", idRol.toString())))
				.collect(Collectors.toList());
		
		sucursal.getUsuarios().add(usuario);
		usuario.setRoles(roles);
		usuario.setSucursal(sucursal);
		usuarioRepository.save(usuario);
		sucursalRepository.save(sucursal);
	}
}
