interface Obsolescense {
  id: string
  grafico: Grafico
  productos_obsoletos: ObsoletProducts[]
}

interface Grafico {
  X: string[]
  Y: number[]
}

interface ObsoletProducts {
  OG: number
  id_producto: number
  nombre: string
  obsoleto: boolean
  precio_actual: number
  precio_con_descuento: number
  promo_recomendada: number
  stock_actual: number
  ventas_ultimos_3_meses: number
}