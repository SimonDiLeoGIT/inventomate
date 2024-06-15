package com.inventoMate.dtos.meli;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductDTO {

	@JsonProperty("trend_position")
	private int trendPosition;
	@JsonProperty("name")
	private String nameProduct;
	@JsonProperty("additional_info")
	private ProductAdditionalInfoDTO productAditionalAdditionalnfo;
	// lista de atributos del producto (marca, modelo, etc)
	@JsonProperty("attributes")
	private List<AttributeDTO> attributes;
	// fotos del producto
	@JsonProperty("pictures")
	private List<ProductPictureDTO> pictures;

}