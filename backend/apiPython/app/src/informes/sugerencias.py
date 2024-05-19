from flask import json
import pandas as pd
from sklearn.linear_model import LinearRegression
from dateutil.relativedelta import relativedelta
import calendar
from datetime import datetime
from prediccion import obtener_estacion
import math

def obtener_stock_actual(id_producto, data):
    for producto in data['listado_productos']:
        if producto['id_producto'] == id_producto:
            return producto['stock_actual']
    return None

def prediccionPorProducto(id_producto, datos_producto):
    resumen_ventas = datos_producto.groupby(["mes"]).agg({"cantidad":"sum", "precio_unitario":"mean", "%promo":"mean", "estacion":"mean"}).reset_index()
    X = resumen_ventas[["%promo", "precio_unitario", "estacion"]]
    y = resumen_ventas["cantidad"]
    # print("--------------------------------------------------------------")
    # print(y)
    # print(X)
    modelo = LinearRegression()
    modelo.fit(X, y)
    print("Xi:\n" + str(X))
    print("Y:\n" + str(y))
    ultimo_mes = resumen_ventas["mes"].max()
    primer_dia_proximo_mes = datetime(ultimo_mes.year, ultimo_mes.month, 1) + relativedelta(months=1)
    ultimo_dia_mes_siguiente = min(calendar.monthrange(primer_dia_proximo_mes.year, primer_dia_proximo_mes.month)[1], ultimo_mes.day)
    proximo_mes = primer_dia_proximo_mes.replace(day=ultimo_dia_mes_siguiente)
    estacion_proximo_mes = obtener_estacion(proximo_mes)
    valores_ultimo_mes = resumen_ventas[resumen_ventas["mes"] == ultimo_mes].iloc[0][["%promo", "precio_unitario", "estacion"]]
    X_prediccion = [[valores_ultimo_mes["%promo"], valores_ultimo_mes["precio_unitario"], estacion_proximo_mes]]
    prediccion = modelo.predict(X_prediccion)
    
    return prediccion[0]

def procesar_json(json_data):
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

        prediccion = math.ceil(prediccionPorProducto(id_producto, ventas_producto))
        stockProducto = obtener_stock_actual(id_producto,json_data)
        cantidad_a_comprar = math.ceil(prediccion - stockProducto)
        
        if (cantidad_a_comprar > 0):
            justificacion = f"Se espera que el producto {nombre_producto} venda {prediccion} unidades, se recomienda comprar como minimo {cantidad_a_comprar} unidades para satisfacer la demanda esperada del proximo mes."
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


if (__name__) == "__main__":
     with open("datos.json", "r") as archivo:
         datos = json.load(archivo)
     res = procesar_json(datos)
     with open("res.json", 'w') as file:
         json.dump(res, file, indent=4)