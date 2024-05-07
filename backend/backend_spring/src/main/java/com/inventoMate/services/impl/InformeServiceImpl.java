package com.inventoMate.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.inventoMate.dtos.meli.TrendsDTO;
import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Sucursal;
import com.inventoMate.entities.Usuario;
import com.inventoMate.exceptions.ResourceNotFoundException;
import com.inventoMate.repositories.UsuarioRepository;
import com.inventoMate.services.InformeService;
import com.inventoMate.services.MlService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class InformeServiceImpl implements InformeService {

	private final UsuarioRepository usuarioRepository;
	private final MlService mlService;
	
	@Override
	public TrendsDTO informeDeTendencia(String idAuth0, Long idSucursal) {
		
		Usuario usuario = usuarioRepository.findByIdAuth0(idAuth0)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_auth0", idAuth0));
		
		Empresa empresa = usuario.obtenerEmpresa();
		
		Sucursal sucursal = empresa.obtenerSucursal(idSucursal);
		
		if(sucursal == null)
			throw new ResourceNotFoundException("Sucursal", "id_empresa", empresa.getIdEmpresa().toString());
		
		List<String> productos = empresa.obtenerProductosDeSucursal(sucursal);
		
		var responseMeli = mlService.getTendencias(productos);

		return responseMeli;
	}
	
}
