interface AditionalInfo {
  permalink: string
  buy_box_winner: {
    price: number
    currency_id: string
    original_price: number
  }
  short_description: {
    content: string
  }
}

interface Atribute {
  name: string
  value_name: string
}

interface Picture {
  url: string
}

interface Product {
  name: string
  additional_info: AditionalInfo
  attributes: Atribute[]
  pictures: Picture[]
  procesamiento: Process
  trend_position: number
}

interface Process {
  desvio_precio: number
  desvio_trendPosition: number
  media_precio: number
  media_trendPosition: number
  meses_en_tendencia: number
  variacion_precio: VariationChart
  variacion_tendencia: VariationChart
}

interface VariationChart {
  X: string[]
  Y: number[]
}