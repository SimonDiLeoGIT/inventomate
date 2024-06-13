interface Obsolescence {
  id: string
  grafico: Grafico
  grafico_top10_general: Grafico
  grafico_top10_por_categoria: Record<string, Grafico>
  productos_obsoletos: Record<string, ObsoletProducts[]>
}

interface Grafico {
  X: string[]
  Y: number[]
  umbral_de_obsolesencia: number
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

interface ObsoletProductsWithCategory extends ObsoletProducts {
  categoria: string
}