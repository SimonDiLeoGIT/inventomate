from datetime import datetime
import matplotlib.pyplot as plt

def grafico_frecuencias(fechas, frecuencias, idproducto):
    
    # Convertir las fechas a objetos datetime para un mejor manejo
    fechas_datetime = [datetime.strptime(fecha, '%Y-%m') for fecha in fechas]

    # Crear el gráfico de barras
    plt.bar(fechas_datetime[:-1], frecuencias[:-1], width=20, align='center', color='blue', label='Datos')  # Barras azules excepto la última
    plt.bar(fechas_datetime[-1:], frecuencias[-1:], width=20, align='center', color='red', label='Valor Esperado')    # Última barra roja

    # Configurar los ejes y el título
    plt.xlabel('Fechas', fontsize=12)
    plt.ylabel('Unidades vendidas', fontsize=12)
    plt.title('Cantidad esperada a vender del producto')

    # Ajustar el relleno alrededor del gráfico
    plt.margins(x=0.1, y=0.1)

    # Activar el fondo de cuadrícula detrás de las barras
    plt.grid(True, linestyle='--', alpha=0.5, zorder=1)

    # Rotar las etiquetas del eje x para mayor legibilidad
    plt.xticks(rotation=35)

    # Guardar el gráfico como una imagen
    plt.savefig(f'grafico_ventas_{str(idproducto)}.png')




