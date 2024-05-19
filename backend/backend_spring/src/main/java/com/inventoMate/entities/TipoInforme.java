package com.inventoMate.entities;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum TipoInforme {
	PROYECCION_DE_VENTAS("http://localhost:5173/company/reports/sales-forecasting", "Sales Forecasting",
			"Sales Analyst"),
	ANALISIS_DE_TENDENCIA("http://localhost:5173/company/reports/new-trends", "New Trends Analysis", "Trend Analyst"),
	SIGUIENTES_PEDIDOS("http://localhost:5173/company/reports/next-orders", "Next Orders", "Procurement Manager");

	private final String url;
	private final String name;
	private final String rolePermission;

	TipoInforme(String url, String name, String rolePermission) {
		this.url = url;
		this.name = name;
		this.rolePermission = rolePermission;
	}

	public String getUrl() {
		return url;
	}

	public String getName() {
		return name;
	}

	public String getRolePermission() {
		return rolePermission;
	}

	public static List<String> getNames() {
		return Arrays.stream(TipoInforme.values()).map(TipoInforme::getName).collect(Collectors.toList());
	}
}
