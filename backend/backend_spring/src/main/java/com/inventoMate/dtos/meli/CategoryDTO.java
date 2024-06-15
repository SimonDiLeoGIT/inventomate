package com.inventoMate.dtos.meli;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class CategoryDTO {

	@JsonProperty("domain_name")
	private String domainName;
	@JsonProperty("category_id")
	private String categoryId;
	@JsonProperty("category_name")
	private String categoryName;

}