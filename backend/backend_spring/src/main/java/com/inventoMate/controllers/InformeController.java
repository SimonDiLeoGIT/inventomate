package com.inventoMate.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.inventoMate.dtos.informes.DecisionRequest;
import com.inventoMate.dtos.informes.DecisionResponse;
import com.inventoMate.dtos.informes.InformeDTO;
import com.inventoMate.dtos.valoracion.ValoracionRequest;
import com.inventoMate.entities.TipoInforme;
import com.inventoMate.payload.ApiResponse;
import com.inventoMate.services.InformeService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/informes")
@CrossOrigin("*")
public class InformeController {

	private final InformeService informeService;

	@PostMapping("/valorar/{idInforme}/sucursales/{idSucursal}")
	public ResponseEntity<ApiResponse> postInformeTendencia(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idInforme, @PathVariable Long idSucursal, @RequestBody ValoracionRequest valoracion) {
		informeService.valorarInforme(jwt.getSubject(), idInforme, idSucursal, valoracion);
		return ResponseEntity.ok().body(new ApiResponse(true, "Informe valorado con exito"));
	}

	// TENDENCIAS DEL MERCADO
	@PostMapping("/tendencias/{idSucursal}")
	public ResponseEntity<ApiResponse> postInformeTendencia(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idSucursal) {
		informeService.informeDeTendencia(jwt.getSubject(), idSucursal);
		return ResponseEntity.ok().body(new ApiResponse(true, "Informe pedido con exito"));
	}

	@GetMapping("/tendencias/{idSucursal}")
	public ResponseEntity<Page<InformeDTO>> getInformesTendencias(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idSucursal, @RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "desc") String sortDirection,
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta,
			@RequestParam(required = false) Boolean visto) {

		Pageable pageable = PageRequest.of(page, size, Sort.by(Direction.fromString(sortDirection), "fecha"));
		Page<InformeDTO> informes = informeService.getInformesByIdSucursalAndTipoInforme(jwt.getSubject(), idSucursal,
				TipoInforme.ANALISIS_DE_TENDENCIA, pageable, desde, hasta, visto);

		return ResponseEntity.ok(informes);
	}

	@GetMapping("/tendencias/{idInforme}/sucursales/{idSucursal}")
	public ResponseEntity<?> getInformeTendencias(@AuthenticationPrincipal Jwt jwt, @PathVariable Long idInforme,
			@PathVariable Long idSucursal) {
		return ResponseEntity.ok(informeService.getInformeByIdInformeAndIdSucursal(jwt.getSubject(), idSucursal,
				idInforme, TipoInforme.ANALISIS_DE_TENDENCIA));
	}

	@DeleteMapping("/tendencias/{idInforme}/sucursales/{idSucursal}")
	public ResponseEntity<ApiResponse> deleteInformeTendencias(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idInforme, @PathVariable Long idSucursal) {
		informeService.deleteInformeByIdInformeAndIdSucursal(jwt.getSubject(), idSucursal, idInforme,
				TipoInforme.ANALISIS_DE_TENDENCIA);
		return ResponseEntity.ok(new ApiResponse(true, "Informe deleted successfully"));
	}

	// PROYECCION DE VENTAS
	@PostMapping("/proyeccion-de-ventas/{idSucursal}")
	public ResponseEntity<ApiResponse> postInformeProyeccionDeVentas(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idSucursal, @RequestParam LocalDate fechaProyeccion) {
		informeService.informeDeProyeccion(jwt.getSubject(), idSucursal, fechaProyeccion);
		return ResponseEntity.ok().body(new ApiResponse(true, "Informe culminado"));
	}

	@GetMapping("/proyeccion-de-ventas/{idSucursal}")
	public ResponseEntity<Page<InformeDTO>> getInformesProyeccionDeVentas(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idSucursal, @RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "desc") String sortDirection,
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta,
			@RequestParam(required = false) Boolean visto) {

		Pageable pageable = PageRequest.of(page, size, Sort.by(Direction.fromString(sortDirection), "fecha"));
		Page<InformeDTO> informes = informeService.getInformesByIdSucursalAndTipoInforme(jwt.getSubject(), idSucursal,
				TipoInforme.PROYECCION_DE_VENTAS, pageable, desde, hasta, visto);

		return ResponseEntity.ok(informes);
	}

	@GetMapping("/proyeccion-de-ventas/{idInforme}/sucursales/{idSucursal}")
	public ResponseEntity<?> getInformeProyeccionDeVentas(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idInforme, @PathVariable Long idSucursal) {
		return ResponseEntity.ok(informeService.getInformeByIdInformeAndIdSucursal(jwt.getSubject(), idSucursal,
				idInforme, TipoInforme.PROYECCION_DE_VENTAS));
	}

	@DeleteMapping("/proyeccion-de-ventas/{idInforme}/sucursales/{idSucursal}")
	public ResponseEntity<ApiResponse> deleteInformeProyeccionDeVentas(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idInforme, @PathVariable Long idSucursal) {
		informeService.deleteInformeByIdInformeAndIdSucursal(jwt.getSubject(), idSucursal, idInforme,
				TipoInforme.PROYECCION_DE_VENTAS);
		return ResponseEntity.ok(new ApiResponse(true, "Informe deleted successfully"));
	}

	// SIGUIENTES PEDIDOS
	@PostMapping("/siguientes-pedidos/{idSucursal}")
	public ResponseEntity<ApiResponse> postInformeSiguientesPedidos(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idSucursal) {
		informeService.informeDeSiguientesPedidos(jwt.getSubject(), idSucursal);
		return ResponseEntity.ok().body(new ApiResponse(true, "Informe culminado"));
	}

	@GetMapping("/siguientes-pedidos/{idSucursal}")
	public ResponseEntity<Page<InformeDTO>> getInformesSiguientesPedidos(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idSucursal, @RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "desc") String sortDirection,
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta,
			@RequestParam(required = false) Boolean visto) {

		Pageable pageable = PageRequest.of(page, size, Sort.by(Direction.fromString(sortDirection), "fecha"));
		Page<InformeDTO> informes = informeService.getInformesByIdSucursalAndTipoInforme(jwt.getSubject(), idSucursal,
				TipoInforme.SIGUIENTES_PEDIDOS, pageable, desde, hasta, visto);

		return ResponseEntity.ok(informes);
	}

	@GetMapping("/siguientes-pedidos/{idInforme}/sucursales/{idSucursal}")
	public ResponseEntity<?> getInformeSiguientesPedidos(@AuthenticationPrincipal Jwt jwt, @PathVariable Long idInforme,
			@PathVariable Long idSucursal) {
		return ResponseEntity.ok(informeService.getInformeByIdInformeAndIdSucursal(jwt.getSubject(), idSucursal,
				idInforme, TipoInforme.SIGUIENTES_PEDIDOS));
	}

	@DeleteMapping("/siguientes-pedidos/{idInforme}/sucursales/{idSucursal}")
	public ResponseEntity<ApiResponse> deleteInformeSiguientesPedidos(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idInforme, @PathVariable Long idSucursal) {
		informeService.deleteInformeByIdInformeAndIdSucursal(jwt.getSubject(), idSucursal, idInforme,
				TipoInforme.SIGUIENTES_PEDIDOS);
		return ResponseEntity.ok(new ApiResponse(true, "Informe deleted successfully"));
	}

	// OBSOLESCENCIA
	@PostMapping("/obsolescencia/{idSucursal}")
	public ResponseEntity<ApiResponse> postInformeObsolescencia(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idSucursal) {
		informeService.informeDeObsolescencia(jwt.getSubject(), idSucursal);
		return ResponseEntity.ok().body(new ApiResponse(true, "Informe pedido con exito"));
	}

	@GetMapping("/obsolescencia/{idSucursal}")
	public ResponseEntity<Page<InformeDTO>> getInformesObsolescencia(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idSucursal, @RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "desc") String sortDirection,
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta,
			@RequestParam(required = false) Boolean visto) {

		Pageable pageable = PageRequest.of(page, size, Sort.by(Direction.fromString(sortDirection), "fecha"));
		Page<InformeDTO> informes = informeService.getInformesByIdSucursalAndTipoInforme(jwt.getSubject(), idSucursal,
				TipoInforme.OBSOLESCENCIA, pageable, desde, hasta, visto);

		return ResponseEntity.ok(informes);
	}

	@GetMapping("/obsolescencia/{idInforme}/sucursales/{idSucursal}")
	public ResponseEntity<?> getInformeObsolescencia(@AuthenticationPrincipal Jwt jwt, @PathVariable Long idInforme,
			@PathVariable Long idSucursal) {
		return ResponseEntity.ok(informeService.getInformeByIdInformeAndIdSucursal(jwt.getSubject(), idSucursal,
				idInforme, TipoInforme.OBSOLESCENCIA));
	}

	@DeleteMapping("/obsolescencia/{idInforme}/sucursales/{idSucursal}")
	public ResponseEntity<ApiResponse> deleteInformeObsolescencia(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idInforme, @PathVariable Long idSucursal) {
		informeService.deleteInformeByIdInformeAndIdSucursal(jwt.getSubject(), idSucursal, idInforme,
				TipoInforme.OBSOLESCENCIA);
		return ResponseEntity.ok(new ApiResponse(true, "Informe deleted successfully"));
	}

	// DECISION
	@PostMapping("/decision/{idInforme}/sucursales/{idSucursal}")
	public ResponseEntity<ApiResponse> postInformeDecision(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idInforme, @PathVariable Long idSucursal, @RequestBody DecisionRequest decision) {
		informeService.informeDeDecision(jwt.getSubject(), idInforme, idSucursal, decision);
		return ResponseEntity.ok().body(new ApiResponse(true, "decision creada con exito"));
	}

	@GetMapping("/decision/{idSucursal}")
	public ResponseEntity<List<InformeDTO>> getInformesDecision(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idSucursal) {
		return ResponseEntity.ok(informeService.getInformesConDecisiones(jwt.getSubject(), idSucursal));
	}

	@GetMapping("/decision/{idInforme}/sucursales/{idSucursal}")
	public ResponseEntity<List<DecisionResponse>> getInformeDecision(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idInforme, @PathVariable Long idSucursal) {
		return ResponseEntity.ok(informeService.getDecisionesDelInforme(jwt.getSubject(), idSucursal, idInforme));
	}

	@DeleteMapping("/decision/{idInforme}/sucursales/{idSucursal}/decisiones/{idDecision}")
	public ResponseEntity<ApiResponse> deleteInformeDecision(@AuthenticationPrincipal Jwt jwt,
			@PathVariable Long idInforme, @PathVariable Long idSucursal, @PathVariable Long idDecision) {
		informeService.deleteDecisionDelInforme(jwt.getSubject(), idSucursal, idInforme, idDecision);
		return ResponseEntity.ok(new ApiResponse(true, "decision deleted successfully"));
	}
}