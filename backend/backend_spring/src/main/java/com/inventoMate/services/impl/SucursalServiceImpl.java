package com.inventoMate.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.inventoMate.dtos.sucursales.SucursalDTO;
import com.inventoMate.dtos.sucursales.SucursalProfileResponse;
import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.InvitacionSucursal;
import com.inventoMate.entities.Rol;
import com.inventoMate.entities.Sucursal;
import com.inventoMate.entities.Usuario;
import com.inventoMate.exceptions.ResourceAlreadyExistsException;
import com.inventoMate.exceptions.ResourceNotFoundException;
import com.inventoMate.mapper.SucursalMapper;
import com.inventoMate.models.EmailSender;
import com.inventoMate.repositories.EmpresaRepository;
import com.inventoMate.repositories.RolRepository;
import com.inventoMate.repositories.SucursalRepository;
import com.inventoMate.repositories.UsuarioRepository;
import com.inventoMate.services.InvitacionService;
import com.inventoMate.services.RoleAuth0Service;
import com.inventoMate.services.SucursalService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SucursalServiceImpl implements SucursalService {

	private final SucursalRepository sucursalRepository;
	private final SucursalMapper mapper;
	private final UsuarioRepository usuarioRepository;
	private final EmpresaRepository empresaRepository;
	private final RolRepository rolRepository;
	private final InvitacionService invitacionService;
	private final EmailSender emailSender;
	private final RoleAuth0Service roleAuth0Service;

	@Override
	public SucursalProfileResponse createSucursal(String idAuth0, SucursalDTO sucursalDTO) {

		Empresa empresa = findEmpresaByIdAuth0(idAuth0);

		Sucursal sucursal = mapper.mapToSucursal(sucursalDTO);

		empresa.agregarSucursal(sucursal);

		sucursalRepository.save(sucursal);

		return mapper.mapToSucursalProfileResponse(sucursal, empresa);
	}

	@Override
	public SucursalProfileResponse editSucursal(String idAuth0, Long idSucursal, SucursalDTO sucursalDTO) {

		Empresa empresa = findEmpresaByIdAuth0(idAuth0);

		Sucursal sucursal = empresa.obtenerSucursal(idSucursal);

		if (sucursal == null)
			throw new ResourceNotFoundException("sucursal-empresa", "id_sucursal (empresa)", idSucursal.toString());

		mapper.mapToSucursal(sucursalDTO, sucursal);

		sucursalRepository.save(sucursal);

		return mapper.mapToSucursalProfileResponse(sucursal, empresa);
	}

	@Override
	public SucursalProfileResponse getSucursalProfile(String idAuth0, Long idSucursal) {

		Empresa empresa = findEmpresaByIdAuth0(idAuth0);

		Sucursal sucursal = empresa.obtenerSucursal(idSucursal);

		if (sucursal == null)
			throw new ResourceNotFoundException("Sucursal", "id_empresa", empresa.getIdEmpresa().toString());

		return mapper.mapToSucursalProfileResponse(sucursal, empresa);
	}

	@Override
	public void deleteSucursal(String idAuth0, Long idSucursal) {

		Empresa empresa = findEmpresaByIdAuth0(idAuth0);

		Sucursal sucursal = empresa.obtenerSucursal(idSucursal);

		if (sucursal == null)
			throw new ResourceNotFoundException("sucursal-empresa", "id_sucursal (empresa)", idSucursal.toString());

		List<Usuario> empleados = sucursal.obtenerEmpleados();

		roleAuth0Service.revokeUsersAuth0Roles(empleados);

		empresa.eliminarSucursal(sucursal);

		sucursalRepository.delete(sucursal);
		usuarioRepository.saveAll(empleados);
		empresaRepository.save(empresa);
	}

	@Override
	public void inviteUserWithRoles(String idAuth0, Long idSucursal, Long idUsuario, List<Long> idsRol) {

		Empresa empresa = findEmpresaByIdAuth0(idAuth0);

		Sucursal sucursal = empresa.obtenerSucursal(idSucursal);

		if (sucursal == null)
			throw new ResourceNotFoundException("sucursal-empresa", "id_sucursal (empresa)", idSucursal.toString());

		List<Rol> roles = idsRol.stream()
				.map(idRol -> rolRepository.findById(idRol)
						.orElseThrow(() -> new ResourceNotFoundException("Rol", "id_rol", idRol.toString())))
				.collect(Collectors.toList());

		// recupero el usuario a invitar
		Usuario usuario = usuarioRepository.findById(idUsuario)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_usuario", idUsuario.toString()));
		// guardo la invitacion y genero el token para la uri
		String token = invitacionService.saveInvitacion(idUsuario, idSucursal, idsRol);
		// envio el mail al usuario con la invitacion
		sucursal.setEmailSender(emailSender);
		sucursal.enviarInvitacion(usuario, roles, token);
	}

	@Override
	public void addUserWithRoles(InvitacionSucursal invitacionSucursal) {

		Sucursal sucursal = sucursalRepository.findById(invitacionSucursal.getIdSucursal())
				.orElseThrow(() -> new ResourceNotFoundException("Sucursal", "id_sucursal",
						invitacionSucursal.getIdSucursal().toString()));

		Usuario usuario = usuarioRepository.findById(invitacionSucursal.getIdUsuarioInvitado())
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_usuario",
						invitacionSucursal.getIdUsuarioInvitado().toString()));

		if (usuario.trabajaEnSucursal()) {
			throw new ResourceAlreadyExistsException("Usuario", "id_sucursal",
					usuario.getSucursal().getIdSucursal().toString());
		}
		// asigno roles al empleado (mysql) modificar <----
		List<Rol> roles = invitacionSucursal.getRoles().stream()
				.map(idRol -> rolRepository.findById(idRol)
						.orElseThrow(() -> new ResourceNotFoundException("Rol", "id_rol", idRol.toString())))
				.collect(Collectors.toList());

		// asigno roles al empleado (auth0 bd)
		roleAuth0Service.assignRolesToUser(usuario.getIdAuth0(), roles);

		sucursal.agregarEmpleado(usuario, roles);
		usuarioRepository.save(usuario);
		sucursalRepository.save(sucursal);
	}

	@Override
	public void editUserRoles(String idAuth0, Long idSucursal, Long idUsuario, List<Long> idsRol) {
		Empresa empresa = findEmpresaByIdAuth0(idAuth0);

		Sucursal sucursal = empresa.obtenerSucursal(idSucursal);

		if (sucursal == null)
			throw new ResourceNotFoundException("sucursal-empresa", "id_sucursal (empresa)", idSucursal.toString());

		Usuario empleado = sucursal.obtenerEmpleado(idUsuario);

		if (empleado == null)
			throw new ResourceNotFoundException("Usuario", "id_sucursal", idSucursal.toString());

		// valido los roles
		List<Rol> roles = idsRol.stream()
				.map(idRol -> rolRepository.findById(idRol)
						.orElseThrow(() -> new ResourceNotFoundException("Rol", "id_rol", idRol.toString())))
				.collect(Collectors.toList());

		// asigno roles al empleado (auth0 bd)
		roleAuth0Service.unAssignRolesToUser(empleado.getIdAuth0(), empleado.getRoles());
		roleAuth0Service.assignRolesToUser(empleado.getIdAuth0(), roles);

		// guardo los cambios
		empleado.actualizarRoles(roles);
		usuarioRepository.save(empleado);
	}

	@Override
	public SucursalProfileResponse deleteUserFromSucursal(String idAuth0, Long idSucursal, Long idUsuario) {
		Empresa empresa = findEmpresaByIdAuth0(idAuth0);

		Sucursal sucursal = empresa.obtenerSucursal(idSucursal);

		if (sucursal == null)
			throw new ResourceNotFoundException("sucursal-empresa", "id_sucursal (empresa)", idSucursal.toString());

		Usuario empleado = sucursal.obtenerEmpleado(idUsuario);

		if (empleado == null)
			throw new ResourceNotFoundException("Usuario", "id_sucursal", idSucursal.toString());

		sucursal.eliminarEmpleado(empleado);

		roleAuth0Service.unAssignRolesToUser(empleado.getIdAuth0(), empleado.getRoles());

		sucursalRepository.save(sucursal);
		usuarioRepository.save(empleado);
		return mapper.mapToSucursalProfileResponse(sucursal, empresa);
	}

	private Empresa findEmpresaByIdAuth0(String idAuth0) {
		Usuario usuario = usuarioRepository.findByIdAuth0(idAuth0)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_auth0", idAuth0));
		return usuario.obtenerEmpresa();
	}
}
