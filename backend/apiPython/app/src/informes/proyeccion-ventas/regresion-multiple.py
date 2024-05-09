import json
import pandas as pd
from sklearn.linear_model import LinearRegression

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

# Agrupar por producto, mes y estación y calcular la suma de las cantidades vendidas
resumen_ventas = datos.groupby(['nombre_producto', 'mes', 'estacion']).agg({'%promo':'sum', 'precio_unitario':'sum', 'cantidad':'sum'}).reset_index()

# Crear un diccionario para almacenar las predicciones por producto
predicciones_por_producto = {}

for producto, grupo in resumen_ventas.groupby('nombre_producto'):
    X = grupo[['%promo', 'precio_unitario', 'estacion']]
    y = grupo['cantidad']
    print(X)
    print(y)
    # Inicializar y entrenar el modelo de regresión lineal múltiple con los datos agrupados por producto, mes y estación
    modelo = LinearRegression()
    modelo.fit(X, y)
    
    # Obtener los valores de x1, x2 y x3 del último mes registrado para ese producto
    ultimo_mes = grupo['mes'].max()  # Obtener el último mes registrado para el producto
    valores_ultimo_mes = grupo[grupo['mes'] == ultimo_mes].iloc[0][['%promo', 'precio_unitario', 'estacion']]
    x1, x2, x3 = valores_ultimo_mes['%promo'], valores_ultimo_mes['precio_unitario'], valores_ultimo_mes['estacion']
    
    # Preparar datos para la predicción utilizando los valores del último mes
    X_prediccion = [[x1, x2, x3]]
    
    # Realizar la predicción
    prediccion = modelo.predict(X_prediccion)
    
    # Almacenar la predicción en el diccionario
    predicciones_por_producto[producto] = prediccion[0]

print("\nPredicciones de cantidad vendida para el próximo mes por producto:")
for producto, prediccion in predicciones_por_producto.items():
    print("Producto '{}': {}".format(producto, prediccion))