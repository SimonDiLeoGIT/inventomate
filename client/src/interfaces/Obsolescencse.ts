interface Obsolescense {
  id: string
  productos_obsoletos: ObsoletProducts[]
}

interface ObsoletProducts {
  id_producto: number
  nombre: string
  promo_recomendada: number
}