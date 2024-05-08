import json
import pandas as pd
from sklearn.linear_model import LinearRegression

# Cargar el JSON
with open('datos.json', 'r') as file:
    data = json.load(file)

# Crear DataFrame para ventas
df_ventas = pd.DataFrame(data['listado_ventas'])

# Crear lista de registros de ventas
ventas = df_ventas['detalle'].apply(lambda x: [registro for registro in x]).explode().apply(pd.Series)

# Seleccionar características relevantes (%promo, precio_unitario) y la variable dependiente (cantidad)
datos = ventas[['%promo', 'precio_unitario', 'cantidad']]

# Agregar información del producto al DataFrame 'datos'
# Primero, expandir las columnas del producto
productos = ventas['producto'].apply(pd.Series)
# Luego, agregar el nombre del producto al DataFrame 'datos'
datos['nombre_producto'] = productos['nombre']

# Inicializar y entrenar el modelo de regresión lineal múltiple con todos los datos disponibles
modelo = LinearRegression()

# Crear un diccionario para almacenar las predicciones por producto
predicciones_por_producto = {}

# Iterar sobre cada producto único
for producto in datos['nombre_producto'].unique():
    # Filtrar los datos para el producto actual
    datos_producto = datos[datos['nombre_producto'] == producto]
    
    # Dividir los datos en características independientes (X) y la variable dependiente (Y)
    X = datos_producto[['%promo', 'precio_unitario']]
    y = datos_producto['cantidad']
    
    # Entrenar el modelo para el producto actual
    modelo.fit(X, y)
    
    # Preparar datos para la próxima fecha
    datos_proxima_fecha = {
        '%promo': [0],  # Reemplaza con el valor de %promo para la próxima fecha
        'precio_unitario': [2000]  # Reemplaza con el valor de precio_unitario para la próxima fecha
    }
    
    # Realizar la predicción para el producto actual
    prediccion = modelo.predict(pd.DataFrame(datos_proxima_fecha))
    
    # Agregar la predicción al diccionario de predicciones por producto
    predicciones_por_producto[producto] = prediccion[0]

# Imprimir las predicciones por producto
for producto, prediccion in predicciones_por_producto.items():
    print("Predicción de cantidad vendida para el próximo producto '{}' en la próxima fecha:".format(producto), prediccion)