interface Order {
  id_producto: number
  nombre_producto: string
  cantidad: number
  justificacion: string
}

interface NextOrder {
  id_informe: number
  fecha: string
  pedidos: Order[]
}