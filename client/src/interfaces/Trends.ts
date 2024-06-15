interface Trend {
  category_name: string
  category_name_bd: string
  keywords: string[]
  product_matchers: string[]
  products: Product[]
}

interface Trends {
  id: string
  fecha_actual: string
  justificacion: string
  trends: Trend[]
}
