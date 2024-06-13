package com.inventoMate.services.impl;

import org.springframework.stereotype.Service;

import com.inventoMate.dtos.bdEmpresas.BdEmpresaDTO;
import com.inventoMate.entities.BdEmpresa;
import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Sucursal;
import com.inventoMate.entities.Usuario;
import com.inventoMate.exceptions.ResourceNotFoundException;
import com.inventoMate.mapper.BdEmpresaMapper;
import com.inventoMate.repositories.BdEmpresaRepository;
import com.inventoMate.repositories.EmpresaRepository;
import com.inventoMate.repositories.UsuarioRepository;
import com.inventoMate.services.BdEmpresaService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BdEmpresaServiceImpl implements BdEmpresaService {

	private final BdEmpresaRepository bdEmpresaRepository;
	private final UsuarioRepository usuarioRepository;
	private final EmpresaRepository empresaRepository;
	private final BdEmpresaMapper mapper;

	@Override
	public BdEmpresaDTO createBdEmpresa(String idAuth0, BdEmpresaDTO bdEmpresaDTO) {

		Usuario usuario = usuarioRepository.findByIdAuth0(idAuth0)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_auth0", idAuth0));

		if (!usuario.esDueñoDeEmpresa())
			throw new ResourceNotFoundException("Empresa", "owner", usuario.getIdUsuario().toString());

		Empresa empresa = usuario.obtenerEmpresa();

		BdEmpresa bdEmpresa = mapper.mapToBdEmpresa(bdEmpresaDTO, empresa);

		empresa.setBdEmpresa(bdEmpresa);

		bdEmpresaRepository.save(bdEmpresa);
		empresaRepository.save(empresa);

		return mapper.mapToBdEmpresaDTO(bdEmpresa);
	}

	@Override
	public BdEmpresaDTO editBdEmpresa(String idAuth0, BdEmpresaDTO bdEmpresaDTO) {

		Usuario usuario = usuarioRepository.findByIdAuth0(idAuth0)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_auth0", idAuth0));

		if (!usuario.esDueñoDeEmpresa())
			throw new ResourceNotFoundException("Empresa", "owner", usuario.getIdUsuario().toString());

		Empresa empresa = usuario.obtenerEmpresa();

		BdEmpresa bdEmpresa = empresa.getBdEmpresa();

		if (bdEmpresa == null) {
			throw new ResourceNotFoundException("Bd-empresa", "empresa", empresa.getIdEmpresa().toString());
		}

		mapper.mapToBdEmpresa(bdEmpresaDTO, bdEmpresa);

		bdEmpresaRepository.save(bdEmpresa);
		return mapper.mapToBdEmpresaDTO(bdEmpresa);
	}

	@Override
	public void deleteEmpresa(String idAuth0) {

		Usuario usuario = usuarioRepository.findByIdAuth0(idAuth0)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_auth0", idAuth0));

		if (!usuario.esDueñoDeEmpresa())
			throw new ResourceNotFoundException("Empresa", "owner", usuario.getIdUsuario().toString());

		Empresa empresa = usuario.obtenerEmpresa();

		BdEmpresa bdEmpresa = empresa.getBdEmpresa();

		if (bdEmpresa == null) {
			throw new ResourceNotFoundException("Bd-empresa", "empresa", empresa.getIdEmpresa().toString());
		}

		empresa.setBdEmpresa(null);

		empresaRepository.save(empresa);

		bdEmpresaRepository.delete(bdEmpresa);
	}

	@Override
	public BdEmpresaDTO getBdEmpresaCurrentUser(String idAuth0) {

		Usuario usuario = usuarioRepository.findByIdAuth0(idAuth0)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_auth0", idAuth0));

		Empresa empresa = empresaRepository.findByOwner(usuario).orElseThrow(
				() -> new ResourceNotFoundException("Empresa", "owner", usuario.getIdUsuario().toString()));

		BdEmpresa bdEmpresa = bdEmpresaRepository.findByEmpresa(empresa).orElseThrow(
				() -> new ResourceNotFoundException("Bd-empresa", "empresa", empresa.getIdEmpresa().toString()));

		return mapper.mapToBdEmpresaDTO(bdEmpresa);
	}

	@Override
	public boolean existsBdEmpresa(String idAuth0, Long idSucursal) {
		Usuario usuario = usuarioRepository.findByIdAuth0(idAuth0)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_auth0", idAuth0));
		
		Empresa empresa = usuario.getEmpresa();
		
		if(empresa == null) {
			throw new ResourceNotFoundException("Usuarios", "id_empresa", usuario.getIdUsuario().toString());
		}
		
		Sucursal sucursal = empresa.obtenerSucursal(idSucursal);
		
		if(sucursal == null) {
			throw new ResourceNotFoundException("Usuarios", "id_sucursal", "null");
		}
		
		return empresa.getBdEmpresa() != null;
	}

}
