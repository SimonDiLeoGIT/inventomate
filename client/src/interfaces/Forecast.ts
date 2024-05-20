interface ForecastChart {
  X: string[]
  Y: number[]
}

interface ProductForecast {
  cantidad_ventas: number
  cantidad_ventas_estimadas: number
  cantidad_ventas_estimadas_proximo_anio: number
  cantidad_ventas_estimadas_proximo_semestre: number
  diferencia: number
  ganancia: number
  graficoCantidadVendidaXAnio: ForecastChart
  graficoCantidadVendidaXFecha: ForecastChart
  graficoCantidadVendidaXSemestre: ForecastChart
  id_producto: number
  inversion: number
  nombre_producto: string
}

interface Forecast {
  _id: string
  estimaciones_por_producto: ProductForecast[]
  fecha_estimada: string
}