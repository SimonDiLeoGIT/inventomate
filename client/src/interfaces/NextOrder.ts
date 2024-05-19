interface Order {
  cantidad_a_comprar: number
  id_producto: number
  justificacion: string
  nombre_producto: string
  stock_actual: number
}

interface NextOrder {
  id_informe: number
  fecha_actual: string
  pedidos: Order[]
}