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
  en_rango_categoria: InRangeCategory
  factor: Factor
  maximo_precio: number
  maximo_trendPosition: number
  media_precio: number
  media_trendPosition: number
  minimo_precio: number
  minimo_trendPosition: number
  precio_sugerido: SuggestionPrice
  meses_en_tendencia: number
  variacion_precio: Charts
  variacion_tendencia: Charts
}

interface InRangeCategory {
  en_rango: boolean
  justificacion: string
}

interface Factor {
  justificacion: string
  precio_debajo_promedio: boolean
}

interface SuggestionPrice {
  justificacion: string
  precio: number
}