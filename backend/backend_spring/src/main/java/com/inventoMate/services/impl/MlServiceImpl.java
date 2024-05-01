package com.inventoMate.services.impl;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.inventoMate.configuration.meli.MeliProperties;
import com.inventoMate.configuration.meli.MeliUrlsProperties;
import com.inventoMate.dtos.meli.BestSellerDTO;
import com.inventoMate.dtos.meli.CategoryDTO;
import com.inventoMate.dtos.meli.CategoryTrendDTO;
import com.inventoMate.dtos.meli.ProductAdditionalInfoDTO;
import com.inventoMate.dtos.meli.ProductDTO;
import com.inventoMate.dtos.meli.ResultProductDTO;
import com.inventoMate.dtos.meli.TrendKeyWordDTO;
import com.inventoMate.dtos.meli.TrendsDTO;
import com.inventoMate.services.MlService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MlServiceImpl implements MlService {

	private final RestTemplate restTemplate;

	private final MeliProperties meliProperties;

	private final MeliUrlsProperties meliUrlsProperties;

	class MapNode {
		String categoryName;
		List<String> products;

		MapNode(String categoryName) {
			this.categoryName = categoryName;
			products = new LinkedList<String>();
		}
	}

	@Override
	public TrendsDTO getTendencias(List<String> products) {

		// categorizo todos los productos del cliente para recomendar por categoria
		HashMap<String, MapNode> categoryProducts = categorizeProducts(products);

		var trendsResponse = new TrendsDTO();
		var trends = new LinkedList<CategoryTrendDTO>();

		// por cada categoria
		categoryProducts.entrySet().forEach(entry -> {
			var categoryTrend = new CategoryTrendDTO();
			String categoryId = entry.getKey();
			// busco los mas vendidos 
			var bestSellerDTO = highlightsTop20(categoryId);
			// seteo las palabras mas buscadas
			categoryTrend.setKeywords(getTrends(categoryId));
			categoryTrend.setCategoryName(entry.getValue().categoryName);
			categoryTrend.setProducts(new LinkedList<ProductDTO>());
			// por cada producto del top de ventas
			bestSellerDTO.getContent().subList(0, 3).forEach(item -> {
				// obtengo la informacion del producto
				var product = getProductById(item.getId());
				var info = getProductAdditionalInfo(item.getId());
				product.setTrendPosition(item.getPosition());
				product.setProductAditionalAdditionalnfo(info);
				categoryTrend.getProducts().add(product);
			});
			// pongo los productos de la empresa que hicieron que se recomienden los
			// productos de meli
			categoryTrend.setProductMatchers(entry.getValue().products);
			trends.add(categoryTrend);
		});
		trendsResponse.setTrends(trends);
		return trendsResponse;
	}

	private HashMap<String, MapNode> categorizeProducts(List<String> products) {
		// id categoria de ml y la lista de productos de clientes asociados
		var categoryProducts = new HashMap<String, MapNode>();

		products.forEach(product -> {
			// obtengo por el predictor de categoria la categoria de ml asociada al nombre
			CategoryDTO category = null;
			category = predictCategory(1, product);

			// si no existe el id category, lo pongo e inicializo la lista de productos
			// asociados
			if (!categoryProducts.keySet().contains(category.getCategoryId())) {
				categoryProducts.put(category.getCategoryId(), new MapNode(category.getCategoryName()));
			}
			var node = categoryProducts.get(category.getCategoryId());
			// sumo el producto a la lista
			node.products.add(product);
			// update con el producto sumado
			categoryProducts.put(category.getCategoryId(), node);
		});
		return categoryProducts;
	}

	// ranking de productos mas vendidos por categoria
	private BestSellerDTO highlightsTop20(String categoryId) {

		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(meliUrlsProperties.getHighlightTop())
				.pathSegment(categoryId);

		URI uri = builder.build(true).toUri();

		HttpHeaders headers = setAccesToken();

		ResponseEntity<BestSellerDTO> response = restTemplate.exchange(uri, HttpMethod.GET, new HttpEntity<>(headers),
				BestSellerDTO.class);

		return response.getBody();
	}

	// obtengo un producto de mercado libre por su id
	private ProductDTO getProductById(String idProduct) {
		URI uri = URI.create(meliUrlsProperties.getProduct() + idProduct);
		HttpHeaders headers = setAccesToken();
		ResponseEntity<ResultProductDTO> responseEntity = restTemplate.exchange(uri, HttpMethod.GET,
				new HttpEntity<>(headers), ResultProductDTO.class);
		return responseEntity.getBody().getProducts().get(0);
	}

	// predice la categoria de un producto por su nombre
	private CategoryDTO predictCategory(int limit, String productName) {

		String encodedProductName = URLEncoder.encode(productName, StandardCharsets.UTF_8);
		encodedProductName = encodedProductName.replace("+", "%20");

		HttpHeaders headers = setAccesToken();

		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(meliUrlsProperties.getPredictCategory())
				.queryParam("limit", limit)
				.queryParam("q", encodedProductName);

		URI uri = builder.build(true).toUri();

		ResponseEntity<List<CategoryDTO>> responseEntity = restTemplate.exchange(uri, HttpMethod.GET,
				new HttpEntity<>(headers), new ParameterizedTypeReference<List<CategoryDTO>>() {
				});

		// devuelvo solo la primer categoria recomendada
		return responseEntity.getBody().get(0);
	}

	private List<String> getTrends(String categoryId) {

		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(meliUrlsProperties.getTrends())
				.path("/".concat(categoryId));

		URI uri = builder.build(true).toUri();

		HttpHeaders headers = setAccesToken();

		ResponseEntity<List<TrendKeyWordDTO>> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, new HttpEntity<>(headers),
				new ParameterizedTypeReference<List<TrendKeyWordDTO>>() {});

		List<String> response = new ArrayList<String>();

		responseEntity.getBody().forEach(item -> response.add(item.getKeyword()));

		return response;
	}

	private ProductAdditionalInfoDTO getProductAdditionalInfo(String idProduct) {

		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(meliUrlsProperties.getProductAdditionalInfo())
				.path("/".concat(idProduct));

		URI uri = builder.build(true).toUri();

		HttpHeaders headers = setAccesToken();

		ResponseEntity<ProductAdditionalInfoDTO> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, new HttpEntity<>(headers),
				ProductAdditionalInfoDTO.class);

		return responseEntity.getBody();
	}


	private HttpHeaders setAccesToken() {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + meliProperties.getAccessToken());
		return headers;
	}


}