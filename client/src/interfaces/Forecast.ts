interface ForecastChart {
  x: string[]
  y: number[]
}

interface ProductForecast {
  cantidad_ventas: number
  cantidad_ventas_estimadas: number
  diferencia: number
  ganancia: number
  graficoCantidadVendidaXFecha: ForecastChart
  id_producto: number
  inversion: number
  nombre_producto: string
}

interface Forecast {
  _id: string
  estimaciones_por_producto: ProductForecast[]
  fecha_estimada: string
  ganancia_estimada: number
  grafico_beneficio: number[]
  perdida_estimada: number
}