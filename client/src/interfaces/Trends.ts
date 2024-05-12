interface Trend {
  category_name: string
  keywords: string[]
  products: Product[]
  product_matchers: string
}

interface Trends {
  id: string
  trends: Trend[]
}

interface TrendReport {
  id: number,
  fecha: string,
  tipoInforme: string,
  visto: boolean
}
