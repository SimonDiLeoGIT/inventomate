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
import com.inventoMate.dtos.bdEmpresas.tablas.ProductoSucursalInfo;
import com.inventoMate.dtos.bdEmpresas.tablas.VentaDetalle;
import com.inventoMate.dtos.informes.InformeDTO;
import com.inventoMate.dtos.meli.CategoriaMeliDTO;
import com.inventoMate.dtos.meli.ProductoMeliDTO;
import com.inventoMate.dtos.meli.TrendsDTO;
import com.inventoMate.entities.CategoriaMeli;
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

			// Si ya hemos procesado esta venta, obtenemos su JSONObject correspondiente del
			// mapa
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

			// Si ya hemos procesado esta venta, obtenemos su JSONObject correspondiente del
			// mapa
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
		result.put("fecha_prediccion", fecha.toString());
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
		return informes.stream().map(informe -> mapToInformeDTO(informe)).collect(Collectors.toList());
	}

	@Override
	public InformeDTO mapToInformeDTO(Informe informe) {
		return mapper.map(informe, InformeDTO.class);
	}

	@Override
	public JSONObject mapToProductoInformation(List<VentaDetalle> historiaDeVentas,
			List<CompraDetalle> historiaDeCompras, List<ProductoSucursalInfo> productoInfo, Long idSucursal) {
		JSONObject listadoCompras = mapToHistoricoCompras(historiaDeCompras);
		JSONObject listadoVentas = mapToHistoricoVentas(historiaDeVentas);
		JSONObject listadoProductoInformation = mapToProductoStockSucursal(productoInfo);
		JSONObject result = new JSONObject();
		result.put("id_sucursal", idSucursal);
		result.merge(listadoProductoInformation);
		result.merge(listadoCompras);
		result.merge(listadoVentas);
		return result;
	}

	private JSONObject mapToProductoStockSucursal(List<ProductoSucursalInfo> productoInfo) {
		JSONArray resultList = new JSONArray();
		productoInfo.forEach(producto -> {
			JSONObject productoJSON = new JSONObject();
			productoJSON.put("id_producto", producto.getProductId());
			productoJSON.put("nombre", producto.getNombre());
			productoJSON.put("stock_actual", producto.getStock());
			productoJSON.put("fecha_primer_compra", producto.getFechaPrimerCompra().toString());
			productoJSON.put("precio", producto.getPrecioVenta());
			productoJSON.put("categoria", producto.getCategoria());
			resultList.add(productoJSON);
		});
		JSONObject result = new JSONObject();
		result.put("listado_productos", resultList);
		return result;
	}

	@Override
	public JSONObject mapToProductoInformation(List<VentaDetalle> historiaDeVentas,
			List<ProductoSucursalInfo> productosDeSucursal, Long idSucursal) {
		JSONObject listadoVentas = mapToHistoricoVentas(historiaDeVentas);
		JSONObject listadoProductoInformation = mapToProductoStockSucursal(productosDeSucursal);
		JSONObject result = new JSONObject();
		result.put("id_sucursal", idSucursal);
		result.merge(listadoProductoInformation);
		result.merge(listadoVentas);
		return result;
	}

	 @Override
	    public TrendsDTO mapToInformeDeTendencia(TrendsDTO response1, List<CategoriaMeli> response2) {
	        JSONObject historico = new JSONObject();

	        // Agrupar productos por categoría
	        response2.forEach(categoria -> {
	            CategoriaMeliDTO categoriaDTO = mapper.map(categoria, CategoriaMeliDTO.class);
	            JSONArray fechasArray = new JSONArray();

	            // Agrupar productos por fecha dentro de cada categoría
	            Map<LocalDate, List<ProductoMeliDTO>> productosPorFecha = categoria.getProductos().stream()
	                .map(producto -> mapper.map(producto, ProductoMeliDTO.class))
	                .collect(Collectors.groupingBy(ProductoMeliDTO::getFecha));

	            productosPorFecha.forEach((fecha, productosEnFecha) -> {
	                JSONObject fechaObject = new JSONObject();
	                JSONArray productosArray = new JSONArray();

	                productosEnFecha.forEach(productoDTO -> {
	                    JSONObject productoObject = new JSONObject();
	                    productoObject.put("producto", productoDTO);
	                    productosArray.add(productoObject);
	                });

	                fechaObject.put(fecha.toString(), productosArray);
	                fechasArray.add(fechaObject);
	            });

	            historico.put(categoriaDTO.getNombre(), fechasArray);
	        });

	        response1.setHistorico(historico);
	        return response1;
	    }
}
