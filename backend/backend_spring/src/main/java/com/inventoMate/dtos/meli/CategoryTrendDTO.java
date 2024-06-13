package com.inventoMate.dtos.meli;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
@Builder
@JsonPropertyOrder({ "category_name","category_name_bd", "keywords", "products", "product_matchers" })
public class CategoryTrendDTO {

	@JsonProperty("category_name")
	private String categoryName;
	@JsonProperty("category_name_bd")
	private String categoryNameBd;
	private List<String> keywords;
	private List<ProductDTO> products;
	@JsonProperty("product_matchers")
	private List<String> productMatchers;

}
