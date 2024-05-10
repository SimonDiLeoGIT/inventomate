import json
import pandas as pd
from sklearn.linear_model import LinearRegression
from dateutil.relativedelta import relativedelta
import calendar
from datetime import datetime,timedelta
from collections import defaultdict

def prediccionPorProducto(id_producto, data):
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

    # Filtrar ventas para el producto dado
    datos_producto = datos[datos['producto'].apply(lambda x: x['id_producto']) == id_producto]

    # Agrupar por mes y estación y calcular la suma de las cantidades vendidas y los totales ponderados
    resumen_ventas = datos_producto.groupby(['mes', 'estacion']).agg({'cantidad':'sum', 'precio_unitario':'mean', '%promo':'mean'}).reset_index()

    # Crear un DataFrame con las características seleccionadas
    X = resumen_ventas[['%promo', 'precio_unitario', 'estacion']]
    y = resumen_ventas['cantidad']

    # Inicializar y entrenar el modelo de regresión lineal múltiple
    modelo = LinearRegression()
    modelo.fit(X, y)
    #print(X)
    #print(y)
    # Obtener el último mes registrado para el producto
    ultimo_mes = resumen_ventas['mes'].max()  
    
    # Calcular la fecha del próximo mes
    primer_dia_proximo_mes = datetime(ultimo_mes.year, ultimo_mes.month, 1) + relativedelta(months=1)
    ultimo_dia_mes_siguiente = min(calendar.monthrange(primer_dia_proximo_mes.year, primer_dia_proximo_mes.month)[1], ultimo_mes.day)
    proximo_mes = primer_dia_proximo_mes.replace(day=ultimo_dia_mes_siguiente)
    proximo_mes_periodo = pd.to_datetime(proximo_mes).to_period('M')

    # Calcular la estación para el próximo mes
    estacion_proximo_mes = obtener_estacion(proximo_mes)

    # Obtener los valores de x1, x2 y x3 del último mes registrado para ese producto
    valores_ultimo_mes = resumen_ventas[resumen_ventas['mes'] == ultimo_mes].iloc[0][['%promo', 'precio_unitario', 'estacion']]
    x1, x2, x3 = valores_ultimo_mes['%promo'], valores_ultimo_mes['precio_unitario'], estacion_proximo_mes

    #print(x1)
    #print(x2)
    #print(x3)

    # Preparar datos para la predicción utilizando los valores del último mes y la estación del próximo mes
    X_prediccion = [[x1, x2, x3]]
    
    # Realizar la predicción
    prediccion = modelo.predict(X_prediccion)

    return prediccion[0]

# Ejemplo de uso:
#id_producto = 15  # ID del producto para el que se quiere hacer la predicción
#prediccion = regresionLinealMultiple(id_producto)
#print(f"Predicción de cantidad vendida para el próximo mes para el producto con ID {id_producto}: {prediccion}")

def calcular_perdida_estimada(json_data):
    listado_compras = json_data.get('listado_compras', [])
    
    if not listado_compras:
        return 0  # Devolver cero si no hay compras
    
    # Inicializar listas para almacenar las sumas de cantidades y precios unitarios por mes
    sumas_cantidades = []
    sumas_precios_unitarios = []
    sumas_totales = []

    # Calcular las sumas para cada compra
    for compra in listado_compras:
        suma_cantidad = sum(detalle['cantidad'] for detalle in compra['detalle'])
        suma_precio_unitario = sum(detalle['precio_unitario'] for detalle in compra['detalle'])
        suma_total = sum(detalle['total'] for detalle in compra['detalle'])

        sumas_cantidades.append(suma_cantidad)
        sumas_precios_unitarios.append(suma_precio_unitario)
        sumas_totales.append(suma_total)

    # Crear un DataFrame de Pandas para los datos de compra
    df_compras = pd.DataFrame({
        'Suma_Cantidades': sumas_cantidades,
        'Suma_Precio_Unitario': sumas_precios_unitarios,
        'Suma_Total': sumas_totales
    })

    # Separar las características (X) y la variable objetivo (y)
    X = df_compras[['Suma_Cantidades', 'Suma_Precio_Unitario']]
    y = df_compras['Suma_Total']

    # Inicializar y ajustar el modelo de regresión lineal
    modelo = LinearRegression()
    modelo.fit(X, y)
    print("X"+str(X))
    print("y"+str(y))


    # Calcular la cantidad de compras para el próximo mes
    cantidad_compras_proximo_mes = sum(detalle['cantidad'] for compra in listado_compras for detalle in compra['detalle'])

    # Calcular la pérdida estimada para el próximo mes
    perdida_estimada = modelo.predict([[cantidad_compras_proximo_mes, sumas_precios_unitarios[-1]]])[0]

    return perdida_estimada


def calcular_ganancia_estimada(json_data):
    listado_ventas = json_data.get('listado_ventas', [])
    
    if not listado_ventas:
        return 0  # Devolver cero si no hay ventas

    # Inicializar listas para almacenar las sumas de cantidades, precios unitarios y totales
    sumas_cantidades = []
    sumas_precios_unitarios = []
    sumas_totales = []

    # Calcular las sumas para cada venta
    for venta in listado_ventas:
        suma_cantidad = sum(detalle['cantidad'] for detalle in venta['detalle'])
        suma_precio_unitario = sum(detalle['precio_unitario'] for detalle in venta['detalle'])
        suma_total = sum(detalle['total'] for detalle in venta['detalle'])

        sumas_cantidades.append(suma_cantidad)
        sumas_precios_unitarios.append(suma_precio_unitario)
        sumas_totales.append(suma_total)

    # Crear un DataFrame de Pandas para los datos de venta
    df_ventas = pd.DataFrame({
        'Suma_Cantidades': sumas_cantidades,
        'Suma_Precio_Unitario': sumas_precios_unitarios,
        'Suma_Total': sumas_totales
    })

    # Separar las características (X) y la variable objetivo (y)
    X = df_ventas[['Suma_Cantidades', 'Suma_Precio_Unitario']]
    y = df_ventas['Suma_Total']

    # Inicializar y ajustar el modelo de regresión lineal
    modelo = LinearRegression()
    modelo.fit(X, y)
   
    # Calcular las sumas de cantidades y precios unitarios para el próximo mes
    suma_cantidades_proximo_mes = sum(detalle['cantidad'] for detalle in listado_ventas[-1]['detalle'])
    suma_precio_unitario_proximo_mes = sum(detalle['precio_unitario'] for detalle in listado_ventas[-1]['detalle'])

    # Calcular la ganancia estimada para el próximo mes
    ganancia_estimada = modelo.predict([[suma_cantidades_proximo_mes, suma_precio_unitario_proximo_mes]])

    return ganancia_estimada[0]