from flask import json
import pandas as pd
from datetime import datetime
from .prediccion import obtener_estacion, prediccionPorProducto
import math

def obtener_stock_actual(id_producto, data):
    for producto in data['listado_productos']:
        if producto['id_producto'] == id_producto:
            return producto['stock_actual']
    return None

def sugerir(json_data):
    fecha_prediccion = json_data["fecha_prediccion"]
    fechas = []
    ventas_por_producto = {}
    compras_por_producto = {}
    sumas_cantidades_compras = []
    sumas_precios_unitarios_compras = []
    sumas_totales_compras = []
    sumas_cantidades_ventas = []
    sumas_precios_unitarios_ventas = []
    sumas_totales_ventas = []

    for compra in json_data["listado_compras"]:
        fecha_compra = datetime.strptime(compra["fecha_hora"], "%Y-%m-%d %H:%M:%S.%f")
        fechas.append(fecha_compra)
        suma_cantidad = 0
        suma_precio_unitario = 0
        suma_total = 0
        for detalle in compra["detalle"]:
            id_producto = detalle["producto"]["id_producto"]
            if id_producto not in compras_por_producto:
                compras_por_producto[id_producto] = {"inversion": 0, "cantidad_comprada": 0}
            compras_por_producto[id_producto]["inversion"] += detalle["total"]
            compras_por_producto[id_producto]["cantidad_comprada"] += detalle["cantidad"]
            suma_cantidad += detalle["cantidad"]
            suma_precio_unitario += detalle["precio_unitario"]
            suma_total += detalle["total"]
        sumas_cantidades_compras.append(suma_cantidad)    
        sumas_precios_unitarios_compras.append(suma_precio_unitario)
        sumas_totales_compras.append(suma_total)
    
    for venta in json_data["listado_ventas"]:
        fecha_venta = datetime.strptime(venta["fecha_hora"], "%Y-%m-%d %H:%M:%S.%f")
        fechas.append(fecha_venta)
        suma_cantidad = 0
        suma_precio_unitario = 0
        suma_total = 0
        for detalle in venta["detalle"]:
            id_producto = detalle["producto"]["id_producto"]
            if id_producto not in ventas_por_producto:
                ventas_por_producto[id_producto] = {"ganancia": 0, "cantidad_vendida": 0}
            ventas_por_producto[id_producto]["ganancia"] += detalle["total"]
            ventas_por_producto[id_producto]["cantidad_vendida"] += detalle["cantidad"]
            suma_cantidad += detalle["cantidad"]
            suma_precio_unitario += detalle["precio_unitario"]
            suma_total += detalle["total"]
        sumas_cantidades_ventas.append(suma_cantidad)
        sumas_precios_unitarios_ventas.append(suma_precio_unitario)
        sumas_totales_ventas.append(suma_total)

    
    fechas = sorted(set(fechas))

    pedidos = []
    for id_producto in set(list(ventas_por_producto.keys())):
        nombre_producto = next((detalle["producto"]["nombre"] for venta in json_data["listado_ventas"] for detalle in venta["detalle"] if detalle["producto"]["id_producto"] == id_producto), None)
        
        
        ventas_producto = pd.DataFrame([
            {
                "fecha_hora": datetime.strptime(compra["fecha_hora"], "%Y-%m-%d %H:%M:%S.%f"),
                "%promo": detalle["%promo"],
                "precio_unitario": detalle["precio_unitario"],
                "cantidad": detalle["cantidad"],
                "producto": detalle["producto"],
                "mes": pd.to_datetime(compra["fecha_hora"], format="%Y-%m-%d %H:%M:%S.%f").to_period("M"),
                "estacion": obtener_estacion(datetime.strptime(compra["fecha_hora"], "%Y-%m-%d %H:%M:%S.%f"))
            }
            for compra in json_data["listado_ventas"]
            for detalle in compra["detalle"]
            if detalle["producto"]["id_producto"] == id_producto
        ])

        prediccion, _ = prediccionPorProducto(id_producto, ventas_producto)
        prediccion = math.ceil(prediccion)
        stockProducto = obtener_stock_actual(id_producto,json_data)
        cantidad_a_comprar = math.ceil(prediccion - stockProducto)
        
        if (cantidad_a_comprar > 0):
            porcentaje = (stockProducto/prediccion) * 100
            justificacion = f"Se espera que el producto {nombre_producto} venda {prediccion} unidades, se recomienda comprar como minimo {cantidad_a_comprar} unidades para satisfacer la demanda esperada del proximo mes. Se cumple un {porcentaje}% de la demanda con el stock actual."
            pedido = {
                "id_producto": id_producto,
                "nombre_producto": nombre_producto,
                "cantidad_a_comprar": cantidad_a_comprar,
                "justificacion": justificacion
            }
        else:
            justificacion = f"La cantidad de {nombre_producto} que tenemos en stock actualmente ({stockProducto}) alcanza para satisfacer la demanda esperada del proximo mes ({prediccion})"
            pedido = {
                "id_producto": id_producto,
                "nombre_producto": nombre_producto,
                "cantidad_a_comprar": 0,
                "justificacion": justificacion
            }
        pedidos.append(pedido) 

    json_procesado = {
        "fecha_estimada": fecha_prediccion,
        "pedidos": pedidos
    }
    
    return json_procesado


# if (__name__) == "__main__":
#      with open("datos.json", "r") as archivo:
#          datos = json.load(archivo)
#      res = sugerir(datos)
#      with open("res.json", 'w') as file:
#          json.dump(res, file, indent=4)