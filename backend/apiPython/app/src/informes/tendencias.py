from datetime import date, datetime
import json
import pprint
import statistics


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
                procesamiento = procesar_producto(historico_categoria,  prod_nombre, actual_trend_position, actual_precio)
                producto["procesamiento"] = procesamiento
            # pprint.pprint(procesamiento)
    
    return resultado


def procesar_producto(historico_categoria, prod_nombre, actual_trend_position, actual_precio):
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
    
    
    procesamiento = {
        "variacion_precio": ordenarGraficoPorFecha(grafico_precios),
        "variacion_tendencia": ordenarGraficoPorFecha(grafico_tendencia),
        "media_precio": round(statistics.mean(variacion_precios), 2),
        "media_trendPosition": round(statistics.mean(variacion_tendencia), 2),
        "desvio_precio": desvio(variacion_precios),
        "desvio_trendPosition": desvio(variacion_tendencia),
        "meses_en_tendencia": len(meses) - 1,
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


# if (__name__) == "__main__":
#     with open("ejemplo.json", "r", encoding="utf-8") as archivo:
#         datos = json.load(archivo)
#         res = procesar_tendencias(datos)
#     with open("res.json", 'w') as file:
#         json.dump(res, file, indent=4)
