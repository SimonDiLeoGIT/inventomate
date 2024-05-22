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
    fecha_inicio = fecha_actual - timedelta(days=90)  # Retrocedemos 3 meses
    
    resultados = []
    
    for producto in data["listado_productos"]:
        id_producto = producto["id_producto"]
        nombre = producto["nombre"]
        stock_actual = producto["stock_actual"]
        ultima_venta = datetime.strptime(producto["ultima_venta"], "%Y-%m-%d")
        
        # Calcular la obsolescencia basada en la frecuencia de ventas en los últimos tres meses
        ventas_en_periodo = sum(1 for venta in data["listado_ventas"] if
                                datetime.strptime(venta["fecha_hora"].split()[0], "%Y-%m-%d") >= fecha_inicio and
                                any(detalle["producto"]["id_producto"] == id_producto for detalle in venta["detalle"]))
        
        # Calcular la frecuencia promedio de ventas por mes
        meses_pasados = (fecha_actual.year - fecha_inicio.year) * 12 + fecha_actual.month - fecha_inicio.month
        frecuencia_promedio = ventas_en_periodo / meses_pasados if meses_pasados > 0 else 0
        
        # Si la frecuencia promedio es baja, considerar el producto como obsoleto
        obsoleto = frecuencia_promedio <= 1
        
        # Determinar el porcentaje de promoción recomendado
        if obsoleto:
            tiempo_desde_ultima_venta = (fecha_actual - ultima_venta).days
            promocion = min(70, tiempo_desde_ultima_venta // 90 * 5)  # Incremento de promoción cada 3 meses (90 días)
            
            # Ajustar la promoción en función del nivel de stock
            if stock_actual >= 50:
                promocion += 10  # Si tenemos mucho stock, aplicamos una promoción adicional del 10%
            elif stock_actual < 10:
                promocion -= 10  # Si tenemos poco stock, reducimos la promoción en un 10%
        else:
            promocion = 0
        
        resultados.append({
            "id_producto": id_producto,
            "nombre": nombre,
            "obsoleto": obsoleto,
            "promo_recomendada": promocion
        })

    return {"productos_obsoletos": resultados}



if (__name__) == "__main__":
      with open("jsonObsolescencia.json", "r") as archivo:
          datos = json.load(archivo)
      res = calcular_obsolescencia(datos)
      with open("res.json", 'w') as file:
          json.dump(res, file, indent=4)