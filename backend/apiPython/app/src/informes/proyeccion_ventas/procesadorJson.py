from datetime import datetime
from .predicciones import prediccionPorProducto, calcular_perdida_estimada, calcular_ganancia_estimada

async def procesar_json(json_data):
    # Obtener la fecha estimada para el próximo mes
    fecha_prediccion = json_data['fecha_prediccion']
    if fecha_prediccion.endswith('-00'):
        fecha_prediccion = fecha_prediccion[:-3] + '-01'  # Reemplazar '00' con '01' para el primer día del mes
    fecha_estimada = datetime.strptime(fecha_prediccion, '%Y-%m-%d')

    # Inicializar las variables de pérdida y ganancia estimadas
    perdida_total = 0
    ganancia_total = 0

    # Calcular el gráfico de beneficio
    fechas = []
    for compra in json_data['listado_compras']:
        fechas.append(datetime.strptime(compra['fecha_hora'], '%Y-%m-%d %H:%M:%S.%f'))
    for venta in json_data['listado_ventas']:
        fechas.append(datetime.strptime(venta['fecha_hora'], '%Y-%m-%d %H:%M:%S.%f'))
    fechas = sorted(set(fechas))
    beneficio_dia_a_dia = [0] * len(fechas)

    # Conjunto para rastrear los IDs de los productos procesados
    productos_procesados = set()

    # Calcular estimaciones por producto
    estimaciones_por_producto = []
    for venta in json_data['listado_ventas']:
        for detalle in venta['detalle']:
            producto = detalle['producto']
            id_producto = producto['id_producto']

            # Si ya hemos procesado este producto, continuamos con el siguiente
            if id_producto in productos_procesados:
                continue
            
            # Agregamos el ID del producto al conjunto de productos procesados
            productos_procesados.add(id_producto)

            nombre_producto = producto['nombre']
            cantidad_ventas = 0
            for v in json_data['listado_ventas']:
                for det in v['detalle']:
                    if det['producto']['id_producto'] == id_producto:
                        cantidad_ventas += det['cantidad']

            # Calcular la inversión sumando los 'total' de cada detalle de compra para el producto actual
            inversion = 0
            for compra in json_data['listado_compras']:
                for det in compra['detalle']:
                    if det['producto']['id_producto'] == id_producto:
                        inversion += det['total']
            
            # Calcular la ganancia sumando los 'total' de cada detalle de venta para el producto actual
            ganancia = 0
            for v in json_data['listado_ventas']:
                for det in v['detalle']:
                    if det['producto']['id_producto'] == id_producto:
                        ganancia += det['total']

            # Actualizar las variables de pérdida y ganancia estimadas
            perdida_total += inversion
            ganancia_total += ganancia
    
            prediccion, coordenadasGrafico = prediccionPorProducto(id_producto, json_data)
            
            estimacion = {
                'id_producto': id_producto,
                'nombre_producto': nombre_producto,
                'cantidad_ventas': cantidad_ventas,
                'cantidad_ventas_estimadas': prediccion,  # Llamada a la función externa
                'inversion': inversion,
                'ganancia': ganancia,
                'diferencia': ganancia - inversion,
                'graficoCantidadVendidaXFecha': coordenadasGrafico
            }
            estimaciones_por_producto.append(estimacion)

    # Construir el JSON resultante
    json_procesado = {
        'fecha_estimada': fecha_estimada.strftime('%Y-%m-%d'),
        'perdida_estimada': calcular_perdida_estimada(json_data),
        'ganancia_estimada': calcular_ganancia_estimada(json_data),
        'grafico_beneficio': beneficio_dia_a_dia,
        'estimaciones_por_producto': estimaciones_por_producto
    }
    
    return json_procesado

# Esto solo está para hacer pruebas locales

# def test():
#     with open('EstructuraDatos.json', 'r') as file:
#         json_data = json.load(file)

#         # Llamar a la función procesar_json
#         json_procesado = procesar_json(json_data)

#         # Imprimir el resultado
#         print("RESULTADO")
#         print(json.dumps(json_procesado, indent=4))
#     return json_procesado