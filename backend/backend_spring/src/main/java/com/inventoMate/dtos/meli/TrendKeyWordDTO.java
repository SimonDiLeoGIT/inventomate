package com.inventoMate.dtos.meli;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class TrendKeyWordDTO {

	private String keyword;

}