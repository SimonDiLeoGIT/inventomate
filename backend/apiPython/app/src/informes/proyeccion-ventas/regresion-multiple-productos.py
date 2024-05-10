import json
import pandas as pd
from sklearn.linear_model import LinearRegression
from dateutil.relativedelta import relativedelta
import calendar
from datetime import datetime

# Cargar el JSON
with open('datos.json', 'r') as file:
    data = json.load(file)

# Crear DataFrame para ventas
df_ventas = pd.DataFrame(data['listado_ventas'])

# Crear una lista de registros de ventas
ventas = df_ventas['detalle'].apply(lambda x: [registro for registro in x]).explode().apply(pd.Series)

# Convertir la fecha de la venta a formato datetime
ventas['fecha_hora'] = pd.to_datetime(df_ventas['fecha_hora'])

def obtener_estacion(fecha):
    if (fecha.month == 12 and fecha.day >= 21) or (fecha.month == 1) or (fecha.month == 2) or (fecha.month == 3 and fecha.day <= 20):
        return 1  # Verano
    elif (fecha.month == 3 and fecha.day >= 21) or (fecha.month == 4) or (fecha.month == 5) or (fecha.month == 6 and fecha.day <= 20):
        return 3  # Otoño
    elif (fecha.month == 6 and fecha.day >= 21) or (fecha.month == 7) or (fecha.month == 8) or (fecha.month == 9 and fecha.day <= 20):
        return 4  # Invierno
    else:
        return 2  # Primavera

ventas['estacion'] = ventas['fecha_hora'].apply(obtener_estacion)

# Obtener el mes de cada venta
ventas['mes'] = ventas['fecha_hora'].dt.to_period('M')

# Seleccionar características relevantes (%promo, precio_unitario, cantidad, estacion) y el nombre del producto
datos = ventas[['%promo', 'precio_unitario', 'cantidad', 'mes', 'estacion', 'producto']]

# Extraer el nombre del producto
datos['nombre_producto'] = datos['producto'].apply(lambda x: x['nombre'])

# Calcular el total ponderado del precio unitario y %promo utilizando las cantidades vendidas
datos['precio_ponderado'] = datos['precio_unitario'] * datos['cantidad']
datos['promo_ponderado'] = datos['%promo'] * datos['cantidad']

# Agrupar por producto, mes y estación y calcular la suma de las cantidades vendidas y los totales ponderados
resumen_ventas = datos.groupby(['nombre_producto', 'mes', 'estacion']).agg({'cantidad':'sum', 'precio_ponderado':'sum', 'promo_ponderado':'sum'}).reset_index()

# Calcular los promedios ponderados de precio unitario y %promo
resumen_ventas['precio_unitario_promedio'] = resumen_ventas['precio_ponderado'] / resumen_ventas['cantidad']
resumen_ventas['promo_promedio'] = resumen_ventas['promo_ponderado'] / resumen_ventas['cantidad']

# Eliminar columnas intermedias
resumen_ventas.drop(['precio_ponderado', 'promo_ponderado'], axis=1, inplace=True)

# Crear un diccionario para almacenar las predicciones por producto
predicciones_por_producto = {}

for producto, grupo in resumen_ventas.groupby('nombre_producto'):
    X = grupo[['promo_promedio', 'precio_unitario_promedio', 'estacion']]
    y = grupo['cantidad']
    print(X)
    print(y)
    # Inicializar y entrenar el modelo de regresión lineal múltiple con los datos agrupados por producto, mes y estación
    modelo = LinearRegression()
    modelo.fit(X, y)
    
    # Obtener el último mes registrado para el producto
    ultimo_mes = grupo['mes'].max()  
    
    # Calcular la fecha del próximo mes
    primer_dia_proximo_mes = datetime(ultimo_mes.year, ultimo_mes.month, 1) + relativedelta(months=1)
    ultimo_dia_mes_siguiente = min(calendar.monthrange(primer_dia_proximo_mes.year, primer_dia_proximo_mes.month)[1], ultimo_mes.day)
    proximo_mes = primer_dia_proximo_mes.replace(day=ultimo_dia_mes_siguiente)
    proximo_mes_periodo = pd.to_datetime(proximo_mes).to_period('M')

    # Calcular la estación para el próximo mes
    estacion_proximo_mes = obtener_estacion(proximo_mes)

    # Obtener los valores de x1, x2 y x3 del último mes registrado para ese producto
    valores_ultimo_mes = grupo[grupo['mes'] == ultimo_mes].iloc[0][['promo_promedio', 'precio_unitario_promedio', 'estacion']]
    x1, x2, x3 = valores_ultimo_mes['promo_promedio'], valores_ultimo_mes['precio_unitario_promedio'], estacion_proximo_mes
    print(x1)
    print(x2)
    print(x3)
    # Preparar datos para la predicción utilizando los valores del último mes y la estación del próximo mes
    X_prediccion = [[x1, x2, x3]]
    
    # Realizar la predicción
    prediccion = modelo.predict(X_prediccion)
    
    # Almacenar la predicción en el diccionario
    predicciones_por_producto[producto] = prediccion[0]

print("\nPredicciones de cantidad vendida para el próximo mes por producto:")
for producto, prediccion in predicciones_por_producto.items():
    print("Producto '{}': {}".format(producto, prediccion))
