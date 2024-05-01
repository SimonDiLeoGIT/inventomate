package com.inventoMate.dtos.meli;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductAdditionalInfoDTO {

	private String permalink;
	@JsonProperty("buy_box_winner")
	private BuyBoxDTO buyBox;
	@JsonProperty("short_description")
	private ProductDescriptionDTO productDescription;

}
