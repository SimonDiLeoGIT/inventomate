package com.inventoMate.dtos.meli;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class BuyBoxDTO {

	private String price;
	@JsonProperty("currency_id")
	private String currency;
	@JsonProperty("original_price")
	private String originalPrice;
}
