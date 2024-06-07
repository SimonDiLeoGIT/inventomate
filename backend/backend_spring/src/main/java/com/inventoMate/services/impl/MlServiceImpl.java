package com.inventoMate.services.impl;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.stereotype.Service;

import com.inventoMate.configuration.meli.MeliProperties;
import com.inventoMate.dtos.meli.CategoryDTO;
import com.inventoMate.dtos.meli.CategoryTrendDTO;
import com.inventoMate.dtos.meli.TrendsDTO;
import com.inventoMate.entities.CategoriaMeli;
import com.inventoMate.entities.MeliToken;
import com.inventoMate.feign.MeliClient;
import com.inventoMate.repositories.CategoriaMeliRepository;
import com.inventoMate.repositories.MeliTokenRepository;
import com.inventoMate.services.MlService;

import lombok.AllArgsConstructor;
import net.minidev.json.JSONObject;

@Service
@AllArgsConstructor
public class MlServiceImpl implements MlService {

	private final MeliClient meliClient;
	private final MeliProperties meliProperties;
	private final MeliTokenRepository meliTokenRepository;
	private final CategoriaMeliRepository categoriaMeliRepository;

	class MapNode {
		String categoryName;
		List<String> products;

		MapNode(String categoryName) {
			this.categoryName = categoryName;
			products = new LinkedList<>();
		}
	}

	@Override
	public TrendsDTO getTendencias(List<String> products) {
		HashMap<String, MapNode> categoryProducts = categorizeProducts(products);
		var trendsResponse = new TrendsDTO();
		var trends = new LinkedList<CategoryTrendDTO>();

		categoryProducts.entrySet().forEach(entry -> {
			guardarHistoricoDeCategoria(entry);
			var categoryTrend = new CategoryTrendDTO();
			String categoryId = entry.getKey();
			var bestSellerDTO = meliClient.highlightsTop20(categoryId, setAccessToken());
			categoryTrend.setKeywords(getTrends(categoryId));
			categoryTrend.setCategoryName(entry.getValue().categoryName);
			categoryTrend.setProducts(new LinkedList<>());

			bestSellerDTO.getContent().subList(0, 10).forEach(item -> {
				var product = meliClient.getProductById(item.getId(), setAccessToken()).getProducts().get(0);
				var info = meliClient.getProductAdditionalInfo(item.getId(), setAccessToken());
				product.setTrendPosition(item.getPosition());
				product.setProductAditionalAdditionalnfo(info);
				categoryTrend.getProducts().add(product);
			});
			categoryTrend.setProductMatchers(entry.getValue().products);
			trends.add(categoryTrend);
		});

		trendsResponse.setTrends(trends);
		return trendsResponse;
	}

	private void guardarHistoricoDeCategoria(Entry<String, MapNode> entry) {
		CategoriaMeli categoria = categoriaMeliRepository.findByIdMeli(entry.getKey()).orElse(null);
		// si no tengo registro de la categoria entonces la guardo y ahora cada mes obtendre el historico
		if(categoria == null) {
			categoria = new CategoriaMeli();
			categoria.setIdMeli(entry.getKey());
			categoria.setNombre(entry.getValue().categoryName);
			categoria.setProductos(new LinkedList<>());
			categoriaMeliRepository.save(categoria);
		}
	}

	private HashMap<String, MapNode> categorizeProducts(List<String> products) {
		var categoryProducts = new HashMap<String, MapNode>();

		products.forEach(product -> {
			String encodedProductName = URLEncoder.encode(product, StandardCharsets.UTF_8).replace("+", "%20");
			CategoryDTO category = meliClient.predictCategory(1, encodedProductName, setAccessToken()).get(0);

			if (!categoryProducts.containsKey(category.getCategoryId())) {
				categoryProducts.put(category.getCategoryId(), new MapNode(category.getCategoryName()));
			}
			var node = categoryProducts.get(category.getCategoryId());
			node.products.add(product);
			categoryProducts.put(category.getCategoryId(), node);
		});
		return categoryProducts;
	}

	private List<String> getTrends(String categoryId) {
		var trendKeywords = meliClient.getTrends(categoryId, setAccessToken());
		List<String> response = new ArrayList<>();
		trendKeywords.forEach(item -> response.add(item.getKeyword()));
		return response;
	}

	public Map<String, String> refreshToken() {
		JSONObject response = meliClient.refreshToken("refresh_token", meliProperties.getAppId(),
				meliProperties.getClientSecret(), meliProperties.getRefreshToken(), "application/json");
		return Map.of("access_token", response.get("access_token").toString(), "refresh_token",
				response.get("refresh_token").toString());
	}

	private String setAccessToken() {
		MeliToken token = meliTokenRepository.findById("Bearer").orElse(null);
		return "Bearer " + token.getAccessToken();
	}

	@Override
	public List<CategoriaMeli> getHistorico(List<CategoryTrendDTO> trends) {
		var historico = new LinkedList<CategoriaMeli>();
		trends.forEach(trend -> {
			var cat = categoriaMeliRepository.findByNombre(trend.getCategoryName()).orElse(null);
			if(cat != null) {
				historico.add(cat);
			}
		});
		return historico;
	}
}
