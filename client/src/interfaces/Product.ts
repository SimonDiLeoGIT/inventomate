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
  trend_position: number
  name: string
  additional_info: AditionalInfo
  attributes: Atribute[]
  pictures: Picture[]
}