package com.inventoMate.configuration.meli;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

import com.inventoMate.entities.ProductoMeli;
import com.inventoMate.repositories.CategoriaMeliRepository;

import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class obteniendoHistorico {

	private final CategoriaMeliRepository categoriaMeliRepository;
	
	@Scheduled(fixedRate = 6 * 60 * 60 * 1000) 
	public void obtenerTendencias() {
		
		categoriaMeliRepository.findAll()
		.forEach(categoria -> {
			List<ProductoMeli> productos = categoria.getProductos();
			productos.forEach(producto -> {
				
			});
		});
		
	}
}
