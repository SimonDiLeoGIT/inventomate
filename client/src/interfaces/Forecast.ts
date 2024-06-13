interface ProductForecast {
  cantidad_ventas: number
  cantidad_ventas_estimadas: number
  cantidad_ventas_estimadas_proximo_anio: number
  cantidad_ventas_estimadas_proximo_semestre: number
  diferencia: number
  ganancia: number
  graficoCantidadVendidaXAnio: Charts
  graficoCantidadVendidaXFecha: Charts
  graficoCantidadVendidaXSemestre: Charts
  id_producto: number
  inversion: number
  nombre_producto: string
}

interface Forecast {
  _id: string
  estimaciones_por_producto: Record<string, ProductForecast[]>
  fecha_estimada: string
  grafico_general_top10: Charts
  grafico_por_categoria_top10: Record<string, Charts>
}