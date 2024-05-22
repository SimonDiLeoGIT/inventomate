from flask import json
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta


#def obtener_stock_actual(id_producto, data):
#    for producto in data['listado_productos']:
#        if producto['id_producto'] == id_producto:
#            return producto['stock']
#    return None


def calcular_obsolescencia(data):
    fecha_actual = datetime.strptime(data["fecha_actual"], "%Y-%m-%d")
    
    resultados = []
    
    # Coeficientes de ponderación
    alpha = 0.5
    beta = 0.3
    gamma = 0.2
    
    for producto in data["listado_productos"]:
        id_producto = producto["id_producto"]
        nombre = producto["nombre"]
        stock_actual = producto["stock_actual"]
        fecha_primer_compra = datetime.strptime(producto["fecha_primer_compra"], "%Y-%m-%d")
        
        # Obtener las ventas del producto en los últimos tres meses
        fecha_inicio = fecha_actual - timedelta(days=90)  # Últimos 3 meses
        ventas_recientes = [
            venta for venta in data["listado_ventas"]
            if fecha_inicio <= datetime.strptime(venta["fecha_hora"], "%Y-%m-%d %H:%M:%S.%f") <= fecha_actual
        ]
        
        ventas_producto_recientes = [
            detalle for venta in ventas_recientes for detalle in venta["detalle"]
            if detalle["producto"]["id_producto"] == id_producto
        ]
        
        # Calcular el volumen total de ventas en los últimos tres meses
        V_reciente = sum(detalle["cantidad"] for detalle in ventas_producto_recientes)
        
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
        
        # Calcular el porcentaje de promoción recomendado (PP), con un máximo de 80%
        PP = min(OG * 100, 80)
        
        # Determinar si el producto es obsoleto
        obsoleto = OG > 0.2
        
        # Gradualidad en el aumento del porcentaje de promoción recomendada
        if obsoleto:
            # Ajustar el porcentaje de promoción recomendada para que sea gradual
            PP *= min(1, (t_total / 730))  # Escala linealmente en función del tiempo sin ventas, máximo 100%
            resultados.append({
            "id_producto": id_producto,
            "nombre": nombre,
            "promo_recomendada": PP
        })
        

    return {"productos_obsoletos": resultados}



if (__name__) == "__main__":
      with open("jsonPaprobar.json", "r") as archivo:
          datos = json.load(archivo)
      res = calcular_obsolescencia(datos)
      with open("res.json", 'w') as file:
          json.dump(res, file, indent=4)