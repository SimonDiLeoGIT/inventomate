interface Trend {
  category_name: string
  keywords: string[]
  products: Product[]
  product_matchers: string
}

interface Trends {
  trends: Trend[]
}