import json
import pandas as pd
from sklearn.linear_model import LinearRegression
from dateutil.relativedelta import relativedelta
import calendar
from datetime import datetime

def regresionLinealMultiple(id_producto):
    # Cargar el JSON
    with open('EstructuraDatos.json', 'r') as file:
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
    print(X)
    print(y)

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
    print(x1)
    print(x2)
    print(x3)
    # Preparar datos para la predicción utilizando los valores del último mes y la estación del próximo mes
    X_prediccion = [[x1, x2, x3]]
    
    # Realizar la predicción
    prediccion = modelo.predict(X_prediccion)

    return prediccion[0]