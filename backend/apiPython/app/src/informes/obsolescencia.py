from flask import json
from datetime import datetime
from dateutil.relativedelta import relativedelta

def calcular_obsolescencia(data):
    fecha_actual = datetime.strptime(data["fecha_actual"], "%Y-%m-%d")
    
    # Calcular las fechas de inicio de cada mes anterior
    fecha_inicio_mes_pasado = fecha_actual - relativedelta(months=1)
    fecha_inicio_6_meses = fecha_inicio_mes_pasado - relativedelta(months=5)
    
    resultados = []

    for producto in data["listado_productos"]:
        id_producto = producto["id_producto"]
        nombre = producto["nombre"]
        
        # Obtener las ventas del producto
        ventas_por_mes = [0] * 6
        
        for venta in data["listado_ventas"]:
            fecha_venta = datetime.strptime(venta["fecha_hora"].split()[0], "%Y-%m-%d")
            if fecha_venta < fecha_inicio_6_meses:
                continue  # No considerar ventas más viejas que 6 meses
            if fecha_venta >= fecha_inicio_mes_pasado:
                ventas_por_mes[5] += sum(detalle["cantidad"] for detalle in venta["detalle"] if detalle["producto"]["id_producto"] == id_producto)
            else:
                mes_diferencia = (fecha_actual.year - fecha_venta.year) * 12 + fecha_actual.month - fecha_venta.month
                ventas_por_mes[5 - mes_diferencia] += sum(detalle["cantidad"] for detalle in venta["detalle"] if detalle["producto"]["id_producto"] == id_producto)
        
        # Calcular el factor de obsolescencia (OF)
        ventas_pasadas = ventas_por_mes[:-1]  # Las ventas pasadas son las del mes anterior y los 5 meses anteriores
        ventas_mes_actual = ventas_por_mes[-1]  # Las ventas del mes actual son las del mes actual

        if all(venta == 0 for venta in ventas_pasadas):  # Verificar si todas las ventas pasadas son 0
            ventas_pasadas = [0] * 5  # Establecer ventas pasadas como 0 si todas las ventas son 0
            ventas_mes_actual = 0  # Establecer ventas del mes actual como 0 si todas las ventas son 0
            OF = 1.0
        else:
            promedio_ventas_pasadas = sum(ventas_pasadas) / len(ventas_pasadas)
            print(promedio_ventas_pasadas)
            diferencia_ventas = promedio_ventas_pasadas - ventas_mes_actual  
            
            print(str(diferencia_ventas)+""+str(ventas_mes_actual))
            
            OF = diferencia_ventas / 100
            peso_adicional = ventas_pasadas.count(0) * 0.15
            OF += peso_adicional
            
        print(f"Producto: {nombre}, OF: {OF}, Ventas pasadas: {ventas_pasadas}, Ventas del mes actual: {ventas_mes_actual}")
        
        # Determinar el porcentaje de promoción recomendado
        if OF >= 0.05:
            if OF >= 0.80:
                promo_recomendada = 80
            promo_recomendada = OF*100
            resultados.append({
            "id_producto": id_producto,
            "nombre": nombre,
            "promo_recomendada": promo_recomendada
        })
            
    return {"productos_obsoletos": resultados}


#if __name__ == "__main__":
#    with open("obso.json", "r") as archivo:
#        datos = json.load(archivo)
#    res = calcular_obsolescencia(datos)
#    with open("res.json", 'w') as file:
#        json.dump(res, file, indent=4)
