package com.inventoMate.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import com.auth0.exception.Auth0Exception;
import com.auth0.json.mgmt.users.User;
import com.inventoMate.dtos.roles.RolDTO;
import com.inventoMate.dtos.users.EditUserRequest;
import com.inventoMate.dtos.users.UsuarioDTO;
import com.inventoMate.dtos.users.UsuarioProfileResponse;
import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Sucursal;
import com.inventoMate.entities.Usuario;
import com.inventoMate.exceptions.ResourceAlreadyExistsException;
import com.inventoMate.exceptions.ResourceNotFoundException;
import com.inventoMate.mapper.UsuarioMapper;
import com.inventoMate.repositories.UsuarioRepository;
import com.inventoMate.services.UserAuth0Service;
import com.inventoMate.services.UsuarioService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor(onConstructor = @__(@Autowired))
@Service
public class UsuarioServiceImpl implements UsuarioService {
	
    private final UsuarioRepository usuarioRepository;
    private final UserAuth0Service userAuthService;
    private final UsuarioMapper usuarioMapper;

    public UsuarioDTO createUsuario(String idAuth0) throws Auth0Exception {
        // Obtengo el usuario de Auth0 por su ID
        User userAuth0 = userAuthService.getUserById(idAuth0);

        // Valido que no exista un usuario ya creado
        if (usuarioRepository.existsByIdAuth0(idAuth0)) {
            throw new ResourceAlreadyExistsException("Usuario", "Id_Auth0", idAuth0);
        }

        // Creo el usuario con los atributos requeridos
        Usuario usuario = usuarioMapper.mapAuth0UserToUsuario(userAuth0);

        // Lo guardo en la BD
        usuarioRepository.save(usuario);

        // Mapeo el usuario en su DTO
        return usuarioMapper.mapToUsuarioDTO(usuario);
    }

    @Override
    public UsuarioProfileResponse getProfileCurrentUser(String idAuth0) throws Auth0Exception {
        // Recupero usuario principal
        Usuario usuario = userByAuth0Id(idAuth0);

        // Recupero empresa si es dueño
        Empresa empresa = usuario.esDueñoDeEmpresa() ? usuario.getEmpresa() : null;

        // Recupero sucursal si es empleado
        Sucursal sucursal = usuario.trabajaEnSucursal() ? usuario.getSucursal() : null;

        // Recupero empresa para la que trabaja si es empleado
        if (sucursal != null && empresa == null) {
            empresa = sucursal.getEmpresa();
        }

        return usuarioMapper.mapToUsuarioProfileResponse(empresa, sucursal, usuario);
    }

    @Override
    public UsuarioProfileResponse updateUser(String id, @Valid EditUserRequest usuarioEditRequest)
            throws Auth0Exception {
        // Obtengo usuario por Auth0 ID
        Usuario usuario = userByAuth0Id(id);
        
        // Actualizo campos en BD local
        usuarioMapper.mapEditRequestToUsuario(usuario, usuarioEditRequest);
        usuarioRepository.save(usuario);
        
        // Actualizo campos en BD Auth0
        userAuthService.updateUser(id, usuarioEditRequest);
        
        return getProfileCurrentUser(id);
    }

    private Usuario userByAuth0Id(String idAuth0) {
        return usuarioRepository.findByIdAuth0(idAuth0)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_auth0", idAuth0));
    }

    @Override
    @Transactional
    public void deleteUserPrincipal(String idAuth0) {
        usuarioRepository.deleteByIdAuth0(idAuth0);
    }

    @Override
    public List<RolDTO> getUserRoles(String idAuth0, Long idSucursal, Long idUser) {
        // Obtengo el owner
        Usuario owner = userByAuth0Id(idAuth0);
        
        // Obtengo su empresa
        Empresa empresa = owner.getEmpresa();
        
        // Verifico que la sucursal pertenezca a su empresa
        Sucursal sucursal = empresa.obtenerSucursal(idSucursal);
        if (sucursal == null) {
            throw new ResourceNotFoundException("Sucursal", "id_empresa", idSucursal.toString());
        }
        
        // Verifico que el empleado trabaje en la sucursal
        Usuario empleado = sucursal.obtenerEmpleado(idUser);
        if (empleado == null) {
            throw new ResourceNotFoundException("Usuario", "id_sucursal", idSucursal.toString());
        }
        
        // Devuelvo los roles del usuario en la sucursal
        return usuarioMapper.mapUsuarioRolesToRolesDTO(empleado.getRoles());
    }

    @Override
    public List<UsuarioDTO> findByEmail(String email) {
        List<Usuario> usuarios = usuarioRepository.findByEmailStartingWith(email);
        return usuarioMapper.mapToUsuarioDTO(usuarios);
    }
}