from math import ceil
from flask import json
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta


def calcular_obsolescencia(data):
    fecha_actual = datetime.strptime(data["fecha_actual"], "%Y-%m-%d")
    
    resultados = []
    
    # Coeficientes de ponderación
    alpha = 0.5
    beta = 0.3
    gamma = 0.2
    
    grafico_X = []
    grafico_Y = []
    
    for producto in data["listado_productos"]:
        id_producto = producto["id_producto"]
        nombre = producto["nombre"]
        stock_actual = producto["stock_actual"]
        fecha_primer_compra = datetime.strptime(producto["fecha_primer_compra"], "%Y-%m-%d")
        precio = producto["precio"]
        
        # Obtener las ventas del producto en los últimos tres meses
        fecha_inicio = fecha_actual - timedelta(days=90)  # Últimos 3 meses
        
        # Filtrar las ventas recientes basadas en el rango de fechas
        ventas_recientes = []
        for venta in data["listado_ventas"]:
            fecha_venta = datetime.strptime(venta["fecha_hora"], "%Y-%m-%d %H:%M:%S.%f")
            if fecha_inicio <= fecha_venta <= fecha_actual:
                ventas_recientes.append(venta)

        # Filtrar los detalles de producto específicos de las ventas recientes
        ventas_producto_recientes = []
        for venta in ventas_recientes:
            for detalle in venta["detalle"]:
                if detalle["producto"]["id_producto"] == id_producto:
                    ventas_producto_recientes.append(detalle)

    
        
        # Calcular el volumen total de ventas en los últimos tres meses
        V_reciente = sum(detalle["cantidad"] for detalle in ventas_producto_recientes)
        
        print(V_reciente)
        
        # Calcular el volumen total de ventas (histórico)
        V_total = sum(
            detalle["cantidad"] for venta in data["listado_ventas"]
            for detalle in venta["detalle"] if detalle["producto"]["id_producto"] == id_producto
        )
        
        # Calcular t_total y t_ultima
        t_total = (fecha_actual - fecha_primer_compra).days
        
        # Calcular S_max (stock máximo)
        S_max = max(producto["stock_actual"] for producto in data["listado_productos"])
        
        # Evitar división por cero en S_max
        S_max = S_max if S_max > 0 else 1
        
        # Calcular el grado de obsolescencia (OG)
        if t_total > 0 and V_total > 0 and V_reciente > 0:  # Considerar ventas recientes (últimos 3 meses)
            frecuencia_ventas = V_reciente / 3  # Promedio mensual de ventas recientes
            OG = alpha * (1 - (frecuencia_ventas / (V_total / (t_total / 30)))) + beta * (1 / V_total) + gamma * (stock_actual / S_max)
        else:
            OG = 1  # Máxima obsolescencia si no hay ventas recientes
        
        print(frecuencia_ventas)
        print(OG)
        # Calcular el porcentaje de promoción recomendado (PP), con un máximo de 80%
        PP = min(OG * 100, 80)
        print(PP)
        # Determinar si el producto es obsoleto
        obsoleto = OG > 0.2
        # PP *= min(1, (t_total / 730))  # Escala linealmente en función del tiempo sin ventas, máximo 100%
        resultados.append({
            "id_producto": id_producto,
            "nombre": nombre,
            "precio_actual": precio,
            "stock_actual": stock_actual,
            "promo_recomendada": ceil(PP) if obsoleto else 0,
            "precio_con_descuento": round(precio * (1 - (ceil(PP)/100)), 2) if obsoleto else precio,
            "OG": OG if obsoleto else 0,
            "obsoleto": obsoleto,
            "ventas_ultimos_3_meses": V_reciente
        })
        
        grafico_X.append(nombre)
        grafico_Y.append(OG)
        
    grafico = {"X": grafico_X, "Y": grafico_Y}
        
    return {"productos_obsoletos": resultados,
            "grafico": grafico}



# if (__name__) == "__main__":
#       with open("jsonPaprobar.json", "r") as archivo:
#           datos = json.load(archivo)
#       res = calcular_obsolescencia(datos)
#       with open("res.json", 'w') as file:
#           json.dump(res, file, indent=4)