from flask import json
from datetime import datetime


#def obtener_stock_actual(id_producto, data):
#    for producto in data['listado_productos']:
#        if producto['id_producto'] == id_producto:
#            return producto['stock']
#    return None


def calcular_obsolescencia(datos):
    fecha_prediccion = datetime.strptime(datos["fecha_prediccion"], "%Y-%m-%d")
    productos_ventas = {}
    productos_obsoletos = []
    max_promo = 50  # Máximo porcentaje de promoción permitido
    
    # Inicializar los productos con la fecha de la última venta
    for producto in datos["listado_productos"]:
        productos_ventas[producto["id_producto"]] = {
            "nombre": producto["nombre"],
            "ultima_venta": None,
            "%promo": 0
        }
    
    # Procesar las ventas
    for venta in datos["listado_ventas"]:
        fecha_venta = datetime.strptime(venta["fecha_hora"], "%Y-%m-%d %H:%M:%S.%f")
        for detalle in venta["detalle"]:
            id_producto = detalle["producto"]["id_producto"]
            if id_producto in productos_ventas:
                if (productos_ventas[id_producto]["ultima_venta"] is None or
                    fecha_venta > productos_ventas[id_producto]["ultima_venta"]):
                    productos_ventas[id_producto]["ultima_venta"] = fecha_venta
    
    # Calcular la obsolencia y el %promo
    for id_producto, info in productos_ventas.items():
        if info["ultima_venta"] is None:
            meses_sin_vender = (fecha_prediccion.year - 2020) * 12 + fecha_prediccion.month  # desde enero 2020
        else:
            meses_sin_vender = (fecha_prediccion.year - info["ultima_venta"].year) * 12 + fecha_prediccion.month - info["ultima_venta"].month
        
        if meses_sin_vender > 3:
            info["cantidad_de_meses_que_no_se_vende"] = meses_sin_vender
            incremento_promo = 5 * (meses_sin_vender - 3)  # 5% adicional por cada mes adicional sin vender
            info["%promo"] = min(max_promo, incremento_promo)  # Aplicar límite máximo
            productos_obsoletos.append({
                "id_producto": id_producto,
                "nombre_producto": info["nombre"],
                "cantidad_de_meses_que_no_se_vende": meses_sin_vender,
                "%promo": info["%promo"]
            })
    
    return {"productos_obsoletos": productos_obsoletos}



if (__name__) == "__main__":
      with open("jsonObsolescencia.json", "r") as archivo:
          datos = json.load(archivo)
      res = calcular_obsolescencia(datos)
      with open("res.json", 'w') as file:
          json.dump(res, file, indent=4)