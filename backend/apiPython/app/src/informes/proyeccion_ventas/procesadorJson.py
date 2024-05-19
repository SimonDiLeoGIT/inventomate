from flask import json
import pandas as pd
from sklearn.linear_model import LinearRegression
from dateutil.relativedelta import relativedelta
import calendar
from datetime import datetime

def obtener_estacion(fecha):
    if (fecha.month == 12 and fecha.day >= 21) or (fecha.month == 1) or (fecha.month == 2) or (fecha.month == 3 and fecha.day <= 20):
        return 1  # Verano
    elif (fecha.month == 3 and fecha.day >= 21) or (fecha.month == 4) or (fecha.month == 5) or (fecha.month == 6 and fecha.day <= 20):
        return 3  # Otoño
    elif (fecha.month == 6 and fecha.day >= 21) or (fecha.month == 7) or (fecha.month == 8) or (fecha.month == 9 and fecha.day <= 20):
        return 4  # Invierno
    else:
        return 2  # Primavera

def sumar_un_mes(fecha):
    fecha_dt = datetime.strptime(fecha, "%Y-%m")
    nuevo_anio = fecha_dt.year
    nuevo_mes = fecha_dt.month + 1
    if nuevo_mes > 12:
        nuevo_anio += 1
        nuevo_mes = 1
    nueva_fecha = f"{nuevo_anio:04d}-{nuevo_mes:02d}"
    return nueva_fecha

def prediccionPorProducto(id_producto, datos_producto):
    # Agrupar por mes y estación y calcular la suma de las cantidades vendidas y los totales ponderados
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
    
    grafico_y = y.tolist()
    grafico_y.append(round(prediccion[0], 2))
    grafico_x = datos_producto["mes"].dt.strftime("%Y-%m").tolist()
    grafico_x = list(set(grafico_x))
    grafico_x.sort()
    nuevo_mes = sumar_un_mes(grafico_x[-1])
    grafico_x.append(nuevo_mes)
    coordenadas = {"X": grafico_x, "Y": grafico_y}
    return prediccion[0], coordenadas

def procesar_json(json_data):
    fecha_prediccion = json_data["fecha_prediccion"]
    perdida_total = 0
    ganancia_total = 0
    productos_procesados = set()
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

    df_compras = pd.DataFrame({
        "Suma_Cantidades": sumas_cantidades_compras,
        "Suma_Precio_Unitario": sumas_precios_unitarios_compras,
        "Suma_Total": sumas_totales_compras
    })

    #X_compras = df_compras[["Suma_Cantidades", "Suma_Precio_Unitario"]]
    #y_compras = df_compras["Suma_Total"]
    #modelo_compras = LinearRegression()
    #modelo_compras.fit(X_compras, y_compras)
    cantidad_compras_proximo_mes = sum(detalle["cantidad"] for compra in json_data["listado_compras"] for detalle in compra["detalle"])
    #perdida_estimada = modelo_compras.predict([[cantidad_compras_proximo_mes, sumas_precios_unitarios_compras[-1]]])[0]

    df_ventas = pd.DataFrame({
        "Suma_Cantidades": sumas_cantidades_ventas,
        "Suma_Precio_Unitario": sumas_precios_unitarios_ventas,
        "Suma_Total": sumas_totales_ventas
    })
    
    #X_ventas = df_ventas[["Suma_Cantidades", "Suma_Precio_Unitario"]]
    #y_ventas = df_ventas["Suma_Total"]
    #modelo_ventas = LinearRegression()
    #modelo_ventas.fit(X_ventas, y_ventas)
    suma_cantidades_proximo_mes = sum(detalle["cantidad"] for detalle in json_data["listado_ventas"][-1]["detalle"])
    suma_precio_unitario_proximo_mes = sum(detalle["precio_unitario"] for detalle in json_data["listado_ventas"][-1]["detalle"])
    #ganancia_estimada = modelo_ventas.predict([[suma_cantidades_proximo_mes, suma_precio_unitario_proximo_mes]])[0]

    estimaciones_por_producto = []
    #for id_producto in set(list(ventas_por_producto.keys()) + list(compras_por_producto.keys())):
    for id_producto in set(list(ventas_por_producto.keys())):
        nombre_producto = next((detalle["producto"]["nombre"] for compra in json_data["listado_compras"] for detalle in compra["detalle"] if detalle["producto"]["id_producto"] == id_producto), None)
        cantidad_ventas = ventas_por_producto[id_producto]["cantidad_vendida"] if id_producto in ventas_por_producto else 0
        inversion = compras_por_producto[id_producto]["inversion"] if id_producto in compras_por_producto else 0
        ganancia = ventas_por_producto[id_producto]["ganancia"] if id_producto in ventas_por_producto else 0
        perdida_total += inversion
        ganancia_total += ganancia
        
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

        prediccion, coordenadasGrafico = prediccionPorProducto(id_producto, ventas_producto)
        
        estimacion = {
            "id_producto": id_producto,
            "nombre_producto": nombre_producto,
            "cantidad_ventas": cantidad_ventas,
            "cantidad_ventas_estimadas": prediccion,
            "inversion": inversion,
            "ganancia": ganancia,
            "diferencia": ganancia - inversion,
            "graficoCantidadVendidaXFecha": coordenadasGrafico
        }
        estimaciones_por_producto.append(estimacion)

    json_procesado = {
        "fecha_estimada": fecha_prediccion,
        #"perdida_estimada": perdida_estimada,
        #"ganancia_estimada": ganancia_estimada,
        "estimaciones_por_producto": estimaciones_por_producto
    }
    
    return json_procesado

#if (__name__) == "__main__":
#     with open("EstructuraDatos.json", "r") as archivo:
#         datos = json.load(archivo)
#     res = procesar_json(datos)
#     with open("res.json", 'w') as file:
#         json.dump(res, file, indent=4)