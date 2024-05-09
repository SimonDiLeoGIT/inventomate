package com.inventoMate.mapper.impl;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.inventoMate.dtos.bdEmpresas.tablas.CompraDetalle;
import com.inventoMate.dtos.bdEmpresas.tablas.DetalleCompra;
import com.inventoMate.dtos.bdEmpresas.tablas.DetalleVenta;
import com.inventoMate.dtos.bdEmpresas.tablas.Producto;
import com.inventoMate.dtos.bdEmpresas.tablas.VentaDetalle;
import com.inventoMate.dtos.informes.InformeDTO;
import com.inventoMate.entities.Informe;
import com.inventoMate.entities.TipoInforme;
import com.inventoMate.mapper.InformeMapper;

import lombok.AllArgsConstructor;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

@Component
@AllArgsConstructor
public class InformeMapperImpl implements InformeMapper {

	private final ModelMapper mapper;
	
	@Override
	public JSONObject mapToHistoricoVentas(List<VentaDetalle> ventaDetalles) {
	    JSONObject result = new JSONObject();

	    JSONArray listadoVentas = new JSONArray();
	    Map<Integer, JSONObject> ventasMap = new HashMap<>();

	    for (VentaDetalle ventaDetalle : ventaDetalles) {
	        JSONObject ventaJSON;
	        int idVenta = ventaDetalle.getIdVenta();

	        // Si ya hemos procesado esta venta, obtenemos su JSONObject correspondiente del mapa
	        if (ventasMap.containsKey(idVenta)) {
	            ventaJSON = ventasMap.get(idVenta);
	        } else {
	            // Si es una nueva venta, creamos un nuevo JSONObject para representarla
	            ventaJSON = new JSONObject();
	            ventaJSON.put("id_venta", idVenta);
	            ventaJSON.put("fecha_hora", ventaDetalle.getFechaHora().toString());
	            JSONArray detalleArray = new JSONArray();
	            ventaJSON.put("detalle", detalleArray);
	            listadoVentas.add(ventaJSON);
	            ventasMap.put(idVenta, ventaJSON);
	        }

	        // Creamos el objeto JSON para el detalle actual
	        JSONObject detalleJSON = new JSONObject();
	        DetalleVenta detalleVenta = ventaDetalle.getDetalle();
	        detalleJSON.put("cantidad", detalleVenta.getCantidad());
	        detalleJSON.put("precio_unitario", detalleVenta.getPrecioUnitario());
	        detalleJSON.put("total", detalleVenta.getSubtotal());
	        detalleJSON.put("%promo", detalleVenta.getPromo());

	        Producto producto = detalleVenta.getProducto();
	        JSONObject productoJSON = new JSONObject();
	        productoJSON.put("id_producto", producto.getIdProducto());
	        productoJSON.put("nombre", producto.getNombre());
	        productoJSON.put("categoria", producto.getCategoria().getNombre());

	        detalleJSON.put("producto", productoJSON);

	        // Agregamos el detalle al JSONArray de detalles de la venta correspondiente
	        JSONArray detalleArray = (JSONArray) ventaJSON.get("detalle");
	        detalleArray.add(detalleJSON);
	    }

	    result.put("listado_ventas", listadoVentas);
	    return result;
	}

	@Override
	public JSONObject mapToHistoricoCompras(List<CompraDetalle> compraDetalles) {
	    JSONObject result = new JSONObject();

	    JSONArray listadoVentas = new JSONArray();
	    Map<Integer, JSONObject> ventasMap = new HashMap<>();

	    for (CompraDetalle compraDetalle : compraDetalles) {
	        JSONObject ventaJSON;
	        int idVenta = compraDetalle.getIdCompra();

	        // Si ya hemos procesado esta venta, obtenemos su JSONObject correspondiente del mapa
	        if (ventasMap.containsKey(idVenta)) {
	            ventaJSON = ventasMap.get(idVenta);
	        } else {
	            // Si es una nueva venta, creamos un nuevo JSONObject para representarla
	            ventaJSON = new JSONObject();
	            ventaJSON.put("id_compra", idVenta);
	            ventaJSON.put("fecha_hora", compraDetalle.getFechaHora().toString());
	            JSONArray detalleArray = new JSONArray();
	            ventaJSON.put("detalle", detalleArray);
	            listadoVentas.add(ventaJSON);
	            ventasMap.put(idVenta, ventaJSON);
	        }

	        // Creamos el objeto JSON para el detalle actual
	        JSONObject detalleJSON = new JSONObject();
	        DetalleCompra detalleVenta = compraDetalle.getDetalle();
	        detalleJSON.put("cantidad", detalleVenta.getCantidad());
	        detalleJSON.put("precio_unitario", detalleVenta.getPrecioUnitario());
	        detalleJSON.put("total", detalleVenta.getSubtotal());

	        Producto producto = detalleVenta.getProducto();
	        JSONObject productoJSON = new JSONObject();
	        productoJSON.put("id_producto", producto.getIdProducto());
	        productoJSON.put("nombre", producto.getNombre());
	        productoJSON.put("categoria", producto.getCategoria().getNombre());

	        detalleJSON.put("producto", productoJSON);

	        // Agregamos el detalle al JSONArray de detalles de la venta correspondiente
	        JSONArray detalleArray = (JSONArray) ventaJSON.get("detalle");
	        detalleArray.add(detalleJSON);
	    }

	    result.put("listado_compras", listadoVentas);
	    return result;
	}

	@Override
	public JSONObject mapToHistoricoMovimientos(List<VentaDetalle> historicoVentas,
			List<CompraDetalle> historicoCompras, LocalDate fecha, Long idSucursal) {
		JSONObject listadoCompras = mapToHistoricoCompras(historicoCompras);
		JSONObject listadoVentas = mapToHistoricoVentas(historicoVentas);
	    JSONObject result = new JSONObject();
        result.put("fecha_prediccion", fecha);
        result.put("id_sucursal", idSucursal);
        result.merge(listadoCompras);
        result.merge(listadoVentas);
		return result;
	}

	@Override
	public Informe mapToInforme(String idMongo, TipoInforme tipo) {
		Informe informe = new Informe();
		informe.setTipoInforme(tipo);
		informe.setFecha(LocalDate.now());
		informe.setIdMongo(idMongo);
		informe.setVisto(false);
		return informe;
	}

	
	@Override
	public List<InformeDTO> mapToInformeDTO(List<Informe> informes) {
		return informes.stream()
				.map(informe -> mapToInformeDTO(informe))
				.collect(Collectors.toList());
	}

	@Override
	public InformeDTO mapToInformeDTO(Informe informe) {
		return mapper.map(informe, InformeDTO.class);
	}


}
