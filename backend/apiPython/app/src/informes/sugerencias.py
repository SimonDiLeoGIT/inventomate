from flask import json
import pandas as pd
from datetime import date, datetime
from .prediccion import obtener_estacion, prediccionPorProducto
import math

def obtener_stock_producto(id_producto, data):
    for producto in data['listado_productos']:
        if producto['id_producto'] == id_producto:
            return producto['stock_actual']
    return None

def ordenar_por_Y2(grafico_por_categoria):
    for categoria, datos in grafico_por_categoria.items():
        # Emparejar los elementos de las tres listas
        pares = list(zip(datos["X"], datos["Y"], datos["Y2"]))
        # Ordenar los pares por el valor en Y2
        pares_ordenados = sorted(pares, key=lambda x: x[2])
        # Separar las listas ordenadas
        X_ordenado, Y_ordenado, Y2_ordenado = zip(*pares_ordenados)
        # Convertir de tuplas a listas
        datos["X"] = list(X_ordenado)
        datos["Y"] = list(Y_ordenado)
        datos["Y2"] = list(Y2_ordenado)
    return grafico_por_categoria

def ordenar_grafico_por_Y2(grafico_general):
    # Emparejar los elementos de las tres listas
    pares = list(zip(grafico_general["X"], grafico_general["Y"], grafico_general["Y2"]))
    # Ordenar los pares por el valor en Y2
    pares_ordenados = sorted(pares, key=lambda x: x[2])
    # Separar las listas ordenadas
    X_ordenado, Y_ordenado, Y2_ordenado = zip(*pares_ordenados)
    # Convertir de tuplas a listas
    grafico_general["X"] = list(X_ordenado)
    grafico_general["Y"] = list(Y_ordenado)
    grafico_general["Y2"] = list(Y2_ordenado)
    return grafico_general


def sugerir(json_data):
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

    pedidos = {}
    top_por_categoria = {}
    top_general = []
    grafico_por_categoria = {}
    grafico_general = {"X": [], "Y":[], "Y2":[]}
    
    for id_producto in set(list(ventas_por_producto.keys())):
  
        ventas_producto_list = []
        nombre_producto = None
        
        for venta in json_data["listado_ventas"]:
            for detalle in venta["detalle"]:
                if detalle["producto"]["id_producto"] == id_producto:
                    if not nombre_producto:
                        nombre_producto = detalle["producto"]["nombre"]
                        categoria_producto = detalle["producto"]["categoria"]
                    
                    venta_producto = {
                        "fecha_hora": datetime.strptime(venta["fecha_hora"], "%Y-%m-%d %H:%M:%S.%f"),
                        "%promo": detalle["%promo"],
                        "precio_unitario": detalle["precio_unitario"],
                        "cantidad": detalle["cantidad"],
                        "producto": detalle["producto"],
                        "mes": pd.to_datetime(venta["fecha_hora"], format="%Y-%m-%d %H:%M:%S.%f").to_period("M"),
                        "estacion": obtener_estacion(datetime.strptime(venta["fecha_hora"], "%Y-%m-%d %H:%M:%S.%f"))
                    }
                    
                    ventas_producto_list.append(venta_producto)
        
        ventas_producto = pd.DataFrame(ventas_producto_list)
        
        prediccion, _ = prediccionPorProducto(id_producto, ventas_producto)
        prediccion = math.ceil(prediccion)
        
        stockProducto = obtener_stock_producto(id_producto, json_data)
        cantidad_a_comprar = math.ceil(prediccion - stockProducto)
        porcentaje = 0
        if cantidad_a_comprar > 0:
            porcentaje = round(((stockProducto / prediccion) * 100), 2)
            justificacion = (
                f"Se espera que el producto {nombre_producto} venda {prediccion} unidades, "
                f"se recomienda comprar como mínimo {cantidad_a_comprar} unidades para satisfacer la demanda "
                f"esperada del próximo mes. Se cumple un {porcentaje}% de la demanda con el stock actual."
            )
        else:
            porcentaje = 100
            justificacion = (
                f"La cantidad de {nombre_producto} que tenemos en stock actualmente ({stockProducto}) "
                f"alcanza para satisfacer la demanda esperada del próximo mes ({prediccion})."
            )

        
        pedido = {
            "id_producto": id_producto,
            "nombre_producto": nombre_producto,
            "stock_actual": stockProducto,
            "cantidad_a_comprar": cantidad_a_comprar,
            "porcentaje_cubierto_con_stock_actual": porcentaje,
            "justificacion": justificacion
        }
        
        
        
        pedidos.setdefault(categoria_producto, [])
        pedidos[categoria_producto].append(pedido)
        grafico_por_categoria.setdefault(categoria_producto, {"X": [], "Y": [], "Y2": []})
        
        
        top_por_categoria.setdefault(categoria_producto, [])
        top_por_categoria[categoria_producto].append({
            "id_producto": id_producto,
            "nombre_producto": nombre_producto,
            "stock_actual": stockProducto,
            "cantidad_a_comprar": cantidad_a_comprar,
            "porcentaje_cubierto_con_stock_actual": porcentaje,
            "categoria": categoria_producto
        })
        
        grafico_por_categoria[categoria_producto]["Y"].append(cantidad_a_comprar)
        grafico_por_categoria[categoria_producto]["Y2"].append(porcentaje)
        grafico_por_categoria[categoria_producto]["X"].append(nombre_producto)
        
        # Ordenar la lista por menor porcentaje cubierto
        top_por_categoria[categoria_producto] = sorted(
            top_por_categoria[categoria_producto], 
            key=lambda x: x["porcentaje_cubierto_con_stock_actual"], 
            reverse=True
        )
    
    # Ordeno el grafico por categoria por menor porcentaje cubierto
    grafico_por_categoria = ordenar_por_Y2(grafico_por_categoria)
    
    for categoria in top_por_categoria:
        top_general.extend(top_por_categoria[categoria])


    # Ordenar la lista general por 'cantidad_a_comprar' en orden descendente y quedarse con los 10 mayores
    top_general = sorted(top_general, key=lambda x: x["porcentaje_cubierto_con_stock_actual"])[:10]

    for producto in top_general:
        grafico_general["X"].append(producto["nombre_producto"])
        grafico_general["Y"].append(producto["cantidad_a_comprar"])
        grafico_general["Y2"].append(producto["porcentaje_cubierto_con_stock_actual"])

    grafico_general = ordenar_grafico_por_Y2(grafico_general
                                             )
    # Crear el JSON procesado
    json_procesado = {
        "fecha_actual": date.today().isoformat(),
        "pedidos": pedidos,
        "top_por_categoria": top_por_categoria,
        "top_general": top_general,
        "grafico_por_categoria": grafico_por_categoria,
        "grafico_general": grafico_general
    }
    
    return json_procesado


if (__name__) == "__main__":
    with open("pedidos2.json", "r") as archivo:
        datos = json.load(archivo)
    res = sugerir(datos)
    with open("res.json", 'w') as file:
        json.dump(res, file, indent=4)