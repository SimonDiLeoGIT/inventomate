package com.inventoMate.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.inventoMate.dtos.bdEmpresas.BdEmpresaDTO;
import com.inventoMate.entities.BdEmpresa;
import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Usuario;
import com.inventoMate.exceptions.ResourceNotFoundException;
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
	private final ModelMapper mapper;

	@Override
	public BdEmpresaDTO createBdEmpresa(String idAuth0, BdEmpresaDTO bdEmpresaDTO) {

		Usuario usuario = usuarioRepository.findByIdAuth0(idAuth0)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_auth0", idAuth0));

		Empresa empresa = empresaRepository.findByOwner(usuario).orElseThrow(
				() -> new ResourceNotFoundException("Empresa", "owner", usuario.getIdUsuario().toString()));

		BdEmpresa bdEmpresa = BdEmpresa.builder().empresa(empresa).gestorBd(bdEmpresaDTO.getGestorBd())
				.url(bdEmpresaDTO.getUrl()).password(bdEmpresaDTO.getPassword()).username(bdEmpresaDTO.getUsername())
				.build();

		bdEmpresaRepository.save(bdEmpresa);

		empresa.setBdEmpresa(bdEmpresa);

		empresaRepository.save(empresa);

		return mapper.map(bdEmpresa, BdEmpresaDTO.class);
	}

	@Override
	public BdEmpresaDTO editBdEmpresa(String idAuth0, BdEmpresaDTO bdEmpresaDTO) {

		Usuario usuario = usuarioRepository.findByIdAuth0(idAuth0)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_auth0", idAuth0));

		Empresa empresa = empresaRepository.findByOwner(usuario).orElseThrow(
				() -> new ResourceNotFoundException("Empresa", "owner", usuario.getIdUsuario().toString()));
		
		BdEmpresa bdEmpresa = bdEmpresaRepository.findByEmpresa(empresa).orElseThrow(
				() -> new ResourceNotFoundException("Bd-empresa", "empresa", empresa.getIdEmpresa().toString()));
		
		bdEmpresa.setGestorBd(bdEmpresaDTO.getGestorBd());
		bdEmpresa.setUsername(bdEmpresaDTO.getUsername());
		bdEmpresa.setPassword(bdEmpresaDTO.getPassword());
		bdEmpresa.setUrl(bdEmpresaDTO.getUrl());
		
		bdEmpresaRepository.save(bdEmpresa);
		return mapper.map(bdEmpresa, BdEmpresaDTO.class);
	}

	@Override
	public void deleteEmpresa(String idAuth0) {
		
		Usuario usuario = usuarioRepository.findByIdAuth0(idAuth0)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_auth0", idAuth0));

		Empresa empresa = empresaRepository.findByOwner(usuario).orElseThrow(
				() -> new ResourceNotFoundException("Empresa", "owner", usuario.getIdUsuario().toString()));
		
		BdEmpresa bdEmpresa = bdEmpresaRepository.findByEmpresa(empresa).orElseThrow(
				() -> new ResourceNotFoundException("Bd-empresa", "empresa", empresa.getIdEmpresa().toString()));
		
		empresa.setBdEmpresa(null);
		
		empresaRepository.save(empresa);
		
		bdEmpresaRepository.delete(bdEmpresa);	
	}

}
