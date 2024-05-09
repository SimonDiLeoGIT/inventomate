package com.inventoMate.services.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.inventoMate.dtos.informes.InformeDTO;
import com.inventoMate.dtos.meli.TrendsDTO;
import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Informe;
import com.inventoMate.entities.Sucursal;
import com.inventoMate.entities.TipoInforme;
import com.inventoMate.entities.Usuario;
import com.inventoMate.exceptions.ResourceNotFoundException;
import com.inventoMate.mapper.InformeMapper;
import com.inventoMate.models.EmailSender;
import com.inventoMate.repositories.InformeRepository;
import com.inventoMate.repositories.UsuarioRepository;
import com.inventoMate.services.FlaskService;
import com.inventoMate.services.InformeService;
import com.inventoMate.services.MlService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class InformeServiceImpl implements InformeService {

	private final UsuarioRepository usuarioRepository;
	private final MlService mlService;
	private final InformeMapper mapper;
	private final FlaskService flaskService;
	private final InformeRepository informeRepository;
	private final EmailSender emailSender;
	
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

	@Override
	public void informeDeProyeccion(String subject, Long idSucursal, LocalDate fechaProyeccion) {
		
		Usuario usuario = usuarioRepository.findByIdAuth0(subject)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_auth0", subject));
		
		Empresa empresa = usuario.obtenerEmpresa();
		
		Sucursal sucursal = empresa.obtenerSucursal(idSucursal);
		
		if(sucursal == null)
			throw new ResourceNotFoundException("Sucursal", "id_empresa", empresa.getIdEmpresa().toString());
		
		var historiaDeCompras = empresa.obtenerHistoricoDeCompras(sucursal);
		var historiaDeVentas = empresa.obtenerHistoricoDeVentas(sucursal);
		
		String idMongo = flaskService.postDatosInformeProyeccionDeVentas(mapper.mapToHistoricoMovimientos(historiaDeVentas, historiaDeCompras, fechaProyeccion, idSucursal));
		
		Informe informe = mapper.mapToInformeDeProyeccion(idMongo);
		sucursal.agregarInforme(informe);
		sucursal.setEmailSender(emailSender);
		sucursal.generarNotificacionDeInforme(informe);
		informeRepository.save(informe);
	}

	@Override
	public List<InformeDTO> getInformesByIdSucursalAndTipoInforme(String subject, Long idSucursal,
			TipoInforme proyeccionDeVentas) {
		
		Usuario usuario = usuarioRepository.findByIdAuth0(subject)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_auth0", subject));
		
		Empresa empresa = usuario.obtenerEmpresa();
		
		Sucursal sucursal = empresa.obtenerSucursal(idSucursal);
		
		if(sucursal == null)
			throw new ResourceNotFoundException("Sucursal", "id_empresa", empresa.getIdEmpresa().toString());

		List<Informe> informes = sucursal.obtenerInformes(TipoInforme.PROYECCION_DE_VENTAS);
		
		return mapper.mapToInformeDTO(informes);
	}

	@Override
	public Object getInformeByIdInformeAndIdSucursal(String subject, Long idSucursal, Long idInforme) {
		
		Usuario usuario = usuarioRepository.findByIdAuth0(subject)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_auth0", subject));
		
		Empresa empresa = usuario.obtenerEmpresa();
		
		Sucursal sucursal = empresa.obtenerSucursal(idSucursal);
		
		if(sucursal == null)
			throw new ResourceNotFoundException("Sucursal", "id_empresa", empresa.getIdEmpresa().toString());
		
		Informe informe = sucursal.obtenerInforme(idInforme);
		
		if(informe == null)
			throw new ResourceNotFoundException("Informe", "id_sucursal", sucursal.getIdSucursal().toString());
		
		return flaskService.getDatosInformeDeProyeccionDeVentas(informe.getIdMongo());
	}

	
	
}
