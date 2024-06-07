package com.inventoMate.configuration.meli;

import java.time.LocalDate;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

import com.inventoMate.entities.MeliToken;
import com.inventoMate.entities.ProductoMeli;
import com.inventoMate.feign.MeliClient;
import com.inventoMate.repositories.CategoriaMeliRepository;
import com.inventoMate.repositories.MeliTokenRepository;
import com.inventoMate.repositories.ProductoMeliRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class obteniendoHistorico {

	private final CategoriaMeliRepository categoriaMeliRepository;
	private final MeliClient meliClient;
	private final MeliTokenRepository meliTokenRepository;
	private final ProductoMeliRepository productoMeliRepository;

	// se ejecuta el primer dia de cada mes
	@Scheduled(cron = "0 0 0 1 * *")
	@Transactional
	public void obtenerTendencias() {
		categoriaMeliRepository.findAll()
				// por cada categoria
				.forEach(categoria -> {
					ProductoMeli productMeli = new ProductoMeli();
					// obtengo el top 20
					var bestSellerDTO = meliClient.highlightsTop20(categoria.getIdMeli(), setAccessToken());
					// guardo el top 10
					bestSellerDTO.getContent().subList(0, 10).forEach(item -> {
						var product = meliClient.getProductById(item.getId(), setAccessToken()).getProducts().get(0);
						var info = meliClient.getProductAdditionalInfo(item.getId(), setAccessToken());
						productMeli.setCategoriaMeli(categoria);
						productMeli.setFecha(LocalDate.now());
						productMeli.setIdMeli(item.getId());
						productMeli.setTrendPosition(item.getPosition());
						productMeli.setDivisa(info.getBuyBox().getCurrency());
						productMeli.setPrecio(info.getBuyBox().getPrice());
						productMeli.setNombre(product.getNameProduct());
						categoria.agregarProducto(productMeli);
						categoriaMeliRepository.save(categoria);
					});
				});
		limpiarHistorico();
	}

	private void limpiarHistorico() {
		// borro los productos mas viejos que 12 meses
		productoMeliRepository.deleteByFechaBefore(LocalDate.now().minusMonths(12));
	}

	private String setAccessToken() {
		MeliToken token = meliTokenRepository.findById("Bearer").orElse(null);
		return "Bearer " + token.getAccessToken();
	}
}
