from math import ceil
from flask import json
from datetime import date, datetime, timedelta
from dateutil.relativedelta import relativedelta

def ordenar_coordenadas_por_Y(coordenadas_X, coordenadas_Y, ascendente=False):
    # Combinar las coordenadas X e Y en una lista de tuplas
    coordenadas = list(zip(coordenadas_X, coordenadas_Y))

    # Ordenar las coordenadas basándote en el valor de Y y en la dirección especificada
    coordenadas_ordenadas = sorted(coordenadas, key=lambda coord: coord[1], reverse=not ascendente)

    # Separar las coordenadas ordenadas en listas separadas de X e Y
    coordenadas_X_ordenadas = [coord[0] for coord in coordenadas_ordenadas]
    coordenadas_Y_ordenadas = [coord[1] for coord in coordenadas_ordenadas]

    return coordenadas_X_ordenadas, coordenadas_Y_ordenadas


def calcular_obsolescencia(data):
    fecha_actual = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")

    productos_obsoletos = {}

    # Coeficientes de ponderación
    alpha = 0.5
    beta = 0.3
    gamma = 0.2

    grafico_X = []
    grafico_Y = []
    grafico_por_categoria = {}

    for producto in data["listado_productos"]:
        id_producto = producto["id_producto"]
        nombre = producto["nombre"]
        stock_actual = producto["stock_actual"]
        fecha_primer_compra = datetime.strptime(producto["fecha_primer_compra"], "%Y-%m-%d %H:%M:%S.%f")


        # Obtener las ventas del producto en los últimos tres meses
        fecha_inicio = datetime.strptime(fecha_actual, "%Y-%m-%d %H:%M:%S.%f") - timedelta(days=90)  # Últimos 3 meses

        # Filtrar las ventas recientes basadas en el rango de fechas
        ventas_recientes = []
        for venta in data["listado_ventas"]:
            fecha_venta = datetime.strptime(venta["fecha_hora"], "%Y-%m-%d %H:%M:%S.%f")
            if fecha_inicio <= fecha_venta <= datetime.strptime(fecha_actual, "%Y-%m-%d %H:%M:%S.%f"):
                ventas_recientes.append(venta)

        # Filtrar los detalles de producto específicos de las ventas recientes
        ventas_producto_recientes = []
        for venta in ventas_recientes:
            for detalle in venta["detalle"]:
                if detalle["producto"]["id_producto"] == id_producto:
                    ventas_producto_recientes.append(detalle)

        # Calcular el volumen total de ventas en los últimos tres meses
        V_reciente = sum(detalle["cantidad"] for detalle in ventas_producto_recientes)

        # Calcular el volumen total de ventas (histórico)
        V_total = sum(
            detalle["cantidad"] for venta in data["listado_ventas"]
            for detalle in venta["detalle"] if detalle["producto"]["id_producto"] == id_producto
        )

        # Calcular t_total y t_ultima
        t_total = (datetime.strptime(fecha_actual, "%Y-%m-%d %H:%M:%S.%f") - fecha_primer_compra).days

        # Calcular S_max (stock máximo)
        S_max = max(producto["stock_actual"] for producto in data["listado_productos"])

        # Evitar división por cero en S_max
        S_max = S_max if S_max > 0 else 1

        # Calcular el grado de obsolescencia (OG)
        if t_total > 0 and V_total > 0 and V_reciente > 0:  # Considerar ventas recientes (últimos 3 meses)
            frecuencia_ventas = V_reciente / 3  # Promedio mensual de ventas recientes
            OG = alpha * (1 - (frecuencia_ventas / (V_total / (t_total / 30)))) + beta * (1 / V_total) + gamma * (
                        stock_actual / S_max)
        else:
            OG = 1  # Máxima obsolescencia si no hay ventas recientes

        # Calcular el porcentaje de promoción recomendado (PP), con un máximo de 80%
        PP = min(OG * 100, 80)

        # Determinar si el producto es obsoleto
        obsoleto = OG > 0.2

        productos_obsoletos.setdefault(producto["categoria"], [])
        productos_obsoletos[producto["categoria"]].append({
            "id_producto": id_producto,
            "nombre": nombre,
            "precio_actual": producto["precio"],
            "stock_actual": stock_actual,
            "promo_recomendada": ceil(PP) if obsoleto else 0,
            "precio_con_descuento": round(producto["precio"] * (1 - (ceil(PP) / 100)), 2) if obsoleto else producto["precio"],
            "OG": OG,
            "obsoleto": obsoleto,
            "ventas_ultimos_3_meses": V_reciente
        })

        grafico_X.append(nombre)
        grafico_Y.append(OG)
        
        grafico_por_categoria.setdefault(producto["categoria"], {"X": [], "Y": []})
        grafico_por_categoria[producto["categoria"]]["X"].append(nombre)
        grafico_por_categoria[producto["categoria"]]["Y"].append(OG)
        
        X, Y = ordenar_coordenadas_por_Y(grafico_por_categoria[producto["categoria"]]["X"],grafico_por_categoria[producto["categoria"]]["Y"])
        grafico_por_categoria[producto["categoria"]]["X"] = X[:10]
        grafico_por_categoria[producto["categoria"]]["Y"] = Y[:10]
        
        
    grafico = {"X": grafico_X, "Y": grafico_Y, "umbral_de_obsolesencia": 0.2}

    grafico_general_X, grafico_general_Y = ordenar_coordenadas_por_Y(grafico_X, grafico_Y)
    grafico_general = {
        "X": grafico_general_X[:10],
        "Y": grafico_general_Y[:10], 
        "umbral_de_obsolesencia": 0.2
    }
    
    return {"productos_obsoletos": productos_obsoletos,
            "grafico": grafico,
            "grafico_top10_por_categoria": grafico_por_categoria,
            "grafico_top10_general": grafico_general
    }

# if (__name__) == "__main__":
#       with open("response.json", "r") as archivo:
#           datos = json.load(archivo)
#       res = calcular_obsolescencia(datos)
#       with open("res.json", 'w') as file:
#           json.dump(res, file, indent=4)