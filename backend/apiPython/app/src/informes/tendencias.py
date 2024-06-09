from datetime import date, datetime
import json
import pprint
import statistics


def obtener_datos_cliente(info_cliente, categoria):
    precio_min = 0
    precio_max = 0
    porcentaje_ganancia = 0
    for info_categoria in info_cliente["minimos_maximos_categorias"]:
        if categoria == info_categoria["nombre_categoria"]:
            precio_min = float(info_categoria["precio_minimo"])
            precio_max = float(info_categoria["precio_maximo"])
    
    for info_ganancia in info_cliente["porcentaje_ganancia_categorias"]:
        if categoria == info_ganancia["nombre_categoria"]:
            porcentaje_ganancia = float(info_ganancia["porcentaje_ganancia"])
            
    return precio_min, precio_max, porcentaje_ganancia

def procesar_tendencias(datos):
    resultado = {}
    resultado["fecha_actual"] = date.today().strftime("%Y-%m-%d")
    resultado["trends"] = datos["trends"]
    
    for trend in resultado["trends"]:
        categoria = trend["category_name"].strip()
        for producto in trend["products"]:
            prod_nombre = producto["name"].strip()
            historico_categoria = datos["historico"][categoria]
            actual_trend_position = producto["trend_position"]
            if producto["additional_info"]["buy_box_winner"] is not None:
                actual_precio = float(producto["additional_info"]["buy_box_winner"]["price"])
                min_precio, max_precio, porcentaje = obtener_datos_cliente(datos["informacion_cliente"], categoria)
                procesamiento = procesar_producto(
                    historico_categoria, prod_nombre, 
                    actual_trend_position, 
                    actual_precio, 
                    min_precio, 
                    max_precio, 
                    porcentaje)
                producto["procesamiento"] = procesamiento
            # pprint.pprint(procesamiento)
    
    return resultado


def procesar_producto(historico_categoria, prod_nombre, actual_trend_position, actual_precio, min_precio_cat, max_precio_cat, porcentaje_cat):
    procesamiento = {}
    variacion_precios = [actual_precio]
    variacion_tendencia = [actual_trend_position]
    meses = [date.today().strftime("%Y-%m-%d")]
    for historico_mes in historico_categoria:
        for mes, productos in historico_mes.items():
            # print("------------------------")
            # pprint.pprint(mes)
            # print("------------------------")
            # pprint.pprint(productos)
            # print("------------------------")
            for producto in productos:
                if (producto["nombre"].strip() == prod_nombre.strip()):
                    idProducto = producto["id"]
                    idMeli = producto["idMeli"]
                    trendPosition = producto["trendPosition"]
                    precioProducto = round(float(producto["precio"]), 2)
                    divisaProducto = producto["divisa"]
                    meses.append(mes)
                    variacion_precios.append(precioProducto)
                    variacion_tendencia.append(trendPosition)
                    
            
    
    grafico_precios = {
        "X": meses,
        "Y": variacion_precios 
    }
    
    grafico_tendencia = {
        "X": meses,
        "Y": variacion_tendencia
    }
    
    precio_sugerido = round(actual_precio * ((100 - porcentaje_cat) / 100), 2)
    
    en_rango = ((actual_precio >= min_precio_cat) and (actual_precio <= max_precio_cat))
    
    procesamiento = {
        "variacion_precio": ordenarGraficoPorFecha(grafico_precios),
        "variacion_tendencia": ordenarGraficoPorFecha(grafico_tendencia),
        "media_precio": round(statistics.mean(variacion_precios), 2),
        "media_trendPosition": round(statistics.mean(variacion_tendencia), 2),
        "desvio_precio": desvio(variacion_precios),
        "desvio_trendPosition": desvio(variacion_tendencia),
        "meses_en_tendencia": len(meses) - 1,
        "minimo_precio": min(variacion_precios),
        "maximo_precio": max(variacion_precios),
        "precio_sugerido": precio_sugerido,
        "en_rango_categoria": en_rango
    }
    
    return procesamiento


def ordenarGraficoPorFecha(coordenadasGrafico):
    # Emparejar las fechas con los valores
    pares = list(zip(coordenadasGrafico["X"], coordenadasGrafico["Y"]))
    # Ordenar los pares por la fecha
    pares_ordenados = sorted(pares, key=lambda x: x[0])
    # Separar las fechas y los valores ordenados
    fechas_ordenadas, valores_ordenados = zip(*pares_ordenados)
    # Convertir las tuplas de vuelta a listas (si es necesario)
    fechas_ordenadas = list(fechas_ordenadas)
    valores_ordenados = list(valores_ordenados)
    # Crear el diccionario ordenado
    graficoCoordenadasOrdenado = {
        "X": fechas_ordenadas,
        "Y": valores_ordenados
    }
    
    return graficoCoordenadasOrdenado

def desvio(datos):
    if len(datos) > 1:
        return round(statistics.stdev(datos), 2)
    else:
        return None


if (__name__) == "__main__":
    with open("ejemplo.json", "r", encoding="utf-8") as archivo:
        datos = json.load(archivo)
        res = procesar_tendencias(datos)
    with open("res.json", 'w') as file:
        json.dump(res, file, indent=4)
