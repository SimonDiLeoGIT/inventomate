package com.inventoMate.services.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.inventoMate.dtos.bdEmpresas.tablas.CategoriaGanancia;
import com.inventoMate.dtos.bdEmpresas.tablas.CategoriaRangoPrecios;
import com.inventoMate.dtos.bdEmpresas.tablas.ProductoSucursalInfo;
import com.inventoMate.dtos.informes.DecisionRequest;
import com.inventoMate.dtos.informes.DecisionResponse;
import com.inventoMate.dtos.informes.InformeDTO;
import com.inventoMate.dtos.meli.TrendsDTO;
import com.inventoMate.entities.CategoriaMeli;
import com.inventoMate.entities.Decision;
import com.inventoMate.entities.Empresa;
import com.inventoMate.entities.Informe;
import com.inventoMate.entities.Sucursal;
import com.inventoMate.entities.TipoInforme;
import com.inventoMate.entities.Usuario;
import com.inventoMate.exceptions.ResourceNotFoundException;
import com.inventoMate.mapper.DecisionMapper;
import com.inventoMate.mapper.InformeMapper;
import com.inventoMate.models.EmailSender;
import com.inventoMate.repositories.DecisionRepository;
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
	private final DecisionRepository decisionRepository;
	private final DecisionMapper decisionMapper;
	private final EmailSender emailSender;

	@Override
	public void informeDeTendencia(String idAuth0, Long idSucursal) {
		Sucursal sucursal = obtenerSucursal(idAuth0, idSucursal);
		Empresa empresa = sucursal.getEmpresa();
		List<ProductoSucursalInfo> productos = empresa.obtenerProductos(sucursal);
		TrendsDTO response1 = mlService.getTendencias(productos);
		List<CategoriaMeli> response2 = mlService.getHistorico(response1.getTrends());
		List<CategoriaRangoPrecios> response3 = empresa.obtenerRangoPreciosCategoria(sucursal);
		List<CategoriaGanancia> response4 = empresa.obtenerGananciaCategoria(sucursal);
		TrendsDTO responseMeli = mapper.mapToInformeDeTendencia(response1,response2,response3,response4);
		String idMongo = flaskService.postDatosInformeTendencias(responseMeli);
		Informe informe = mapper.mapToInforme(idMongo, TipoInforme.ANALISIS_DE_TENDENCIA);
		procesarInforme(sucursal, informe);
	}

	@Override
	public void informeDeProyeccion(String subject, Long idSucursal, LocalDate fechaProyeccion) {
		Sucursal sucursal = obtenerSucursal(subject, idSucursal);
		Empresa empresa = sucursal.getEmpresa();
		var historiaDeCompras = empresa.obtenerHistoricoDeCompras(sucursal);
		var historiaDeVentas = empresa.obtenerHistoricoDeVentas(sucursal);
		String idMongo = flaskService.postDatosInformeProyeccionDeVentas(
				mapper.mapToHistoricoMovimientos(historiaDeVentas, historiaDeCompras, fechaProyeccion, idSucursal));
		Informe informe = mapper.mapToInforme(idMongo, TipoInforme.PROYECCION_DE_VENTAS);

		procesarInforme(sucursal, informe);
	}

	@Override
	public void informeDeSiguientesPedidos(String subject, Long idSucursal) {
		Sucursal sucursal = obtenerSucursal(subject, idSucursal);
		Empresa empresa = sucursal.getEmpresa();
		var historiaDeCompras = empresa.obtenerHistoricoDeCompras(sucursal);
		var historiaDeVentas = empresa.obtenerHistoricoDeVentas(sucursal);
		var productosDeSucursal = empresa.obtenerProductos(sucursal);
		String idMongo = flaskService.postDatosInformeSiguientesPedidos(
				mapper.mapToProductoInformation(historiaDeVentas, historiaDeCompras, productosDeSucursal, idSucursal));
		Informe informe = mapper.mapToInforme(idMongo, TipoInforme.SIGUIENTES_PEDIDOS);

		procesarInforme(sucursal, informe);
	}

	@Override
	public void informeDeObsolescencia(String subject, Long idSucursal) {
		Sucursal sucursal = obtenerSucursal(subject, idSucursal);
		Empresa empresa = sucursal.getEmpresa();
		var historiaDeVentas = empresa.obtenerHistoricoDeVentas(sucursal);
		var productosDeSucursalObsolescencia = empresa.obtenerProductos(sucursal);
		String idMongo = flaskService.postDatosInformeObsolescencia(
				mapper.mapToProductoInformation(historiaDeVentas, productosDeSucursalObsolescencia, idSucursal));
		Informe informe = mapper.mapToInforme(idMongo, TipoInforme.OBSOLESCENCIA);

		procesarInforme(sucursal, informe);
	}

	@Override
	public Page<InformeDTO> getInformesByIdSucursalAndTipoInforme(String subject, Long idSucursal,
			TipoInforme tipoInforme, Pageable pageable, LocalDate desde, LocalDate hasta, Boolean visto) {

		Sucursal sucursal = obtenerSucursal(subject, idSucursal);
		Page<Informe> informes = sucursal.obtenerInformes(tipoInforme, pageable, desde, hasta, visto);

		return informes.map(mapper::mapToInformeDTO);
	}

	@Override
	public Object getInformeByIdInformeAndIdSucursal(String subject, Long idSucursal, Long idInforme,
			TipoInforme tipoInforme) {
		Sucursal sucursal = obtenerSucursal(subject, idSucursal);
		Informe informe = obtenerInforme(sucursal, idInforme, tipoInforme);

		informe.setVisto(true);
		informeRepository.save(informe);
		return flaskService.getDatosInformeByTipoInforme(informe.getIdMongo(), informe.getTipoInforme());
	}

	@Override
	public void deleteInformeByIdInformeAndIdSucursal(String subject, Long idSucursal, Long idInforme,
			TipoInforme tipoInforme) {
		Sucursal sucursal = obtenerSucursal(subject, idSucursal);
		Informe informe = eliminarInforme(sucursal, idInforme, tipoInforme);

		var response = flaskService.deleteInformeByIdAndTipoInforme(informe.getIdMongo(), informe.getTipoInforme());
		if (response != HttpStatus.NO_CONTENT)
			throw new RuntimeException("error al eliminar el informe desde mongo : " + response.toString());

		informeRepository.delete(informe);
	}

	@Override
	public void informeDeDecision(String subject, Long idInforme, Long idSucursal, DecisionRequest decisionRequest) {
		Sucursal sucursal = obtenerSucursal(subject, idSucursal);
		Informe informe = obtenerInforme(sucursal, idInforme, null);
		Usuario usuario = obtenerUsuario(subject);

		Decision decision = decisionMapper.mapToDecision(decisionRequest, informe, usuario);
		informe.agregarDecision(decision);
		decisionRepository.save(decision);
		sucursal.setEmailSender(emailSender);
		sucursal.generarNotificacionDeInforme(informe, usuario);
	}

	@Override
	public List<InformeDTO> getInformesConDecisiones(String subject, Long idSucursal) {
		Sucursal sucursal = obtenerSucursal(subject, idSucursal);
		List<Informe> informes = sucursal.obtenerInformesConDecisiones();

		return mapper.mapToInformeDTO(informes);
	}

	@Override
	public List<DecisionResponse> getDecisionesDelInforme(String subject, Long idSucursal, Long idInforme) {
		Sucursal sucursal = obtenerSucursal(subject, idSucursal);
		Informe informe = obtenerInforme(sucursal, idInforme, null);

		return informe.getDecisiones().stream()
				.map(decision -> decisionMapper.mapToDecisionResponse(
						usuarioRepository.findById(decision.getIdEmpleado()).orElse(null), decision))
				.collect(Collectors.toList());
	}

	@Override
	public void deleteDecisionDelInforme(String subject, Long idSucursal, Long idInforme, Long idDecision) {
		Sucursal sucursal = obtenerSucursal(subject, idSucursal);
		Informe informe = obtenerInforme(sucursal, idInforme, null);

		Decision decision = informe.eliminarDecision(idDecision);
		if (decision == null)
			throw new ResourceNotFoundException("Decision", "id_informe", informe.getId().toString());

		decisionRepository.delete(decision);
	}

	private Usuario obtenerUsuario(String subject) {
		return usuarioRepository.findByIdAuth0(subject)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario", "id_auth0", subject));
	}

	private Sucursal obtenerSucursal(String subject, Long idSucursal) {
		Usuario usuario = obtenerUsuario(subject);
		Empresa empresa = usuario.obtenerEmpresa();
		Sucursal sucursal = empresa.obtenerSucursal(idSucursal);

		if (sucursal == null)
			throw new ResourceNotFoundException("Sucursal", "id_empresa", empresa.getIdEmpresa().toString());

		return sucursal;
	}

	private Informe obtenerInforme(Sucursal sucursal, Long idInforme, TipoInforme tipoInforme) {
		Informe informe = sucursal.obtenerInforme(idInforme);

		if (informe == null)
			throw new ResourceNotFoundException("Informe", "id_sucursal", sucursal.getIdSucursal().toString());

		if (tipoInforme != null && !informe.getTipoInforme().equals(tipoInforme))
			throw new ResourceNotFoundException("Informe", "tipoInforme", tipoInforme.toString());

		return informe;
	}

	private Informe eliminarInforme(Sucursal sucursal, Long idInforme, TipoInforme tipoInforme) {
		Informe informe = sucursal.borrarInforme(idInforme);

		if (informe == null)
			throw new ResourceNotFoundException("Informe", "id_sucursal", sucursal.getIdSucursal().toString());

		if (!informe.getTipoInforme().equals(tipoInforme))
			throw new ResourceNotFoundException("Informe", "tipoInforme", tipoInforme.toString());

		return informe;
	}

	private void procesarInforme(Sucursal sucursal, Informe informe) {
		sucursal.agregarInforme(informe);
		sucursal.setEmailSender(emailSender);
		sucursal.generarNotificacionDeInforme(informe);
		informeRepository.save(informe);
	}
}
