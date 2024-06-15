interface PedidoConCategoria extends Pedido {
  categoria: string;
}

interface Pedido {
  cantidad_a_comprar: number;
  id_producto: number;
  justificacion: string;
  nombre_producto: string;
  stock_actual: number;
}

interface Top {
  cantidad_a_comprar: number;
  categoria: string;
  id_producto: number;
  nombre_producto: string;
  stock_actual: number;
}

interface NextOrders {
  _id: string;
  fecha_actual: string;
  grafico_general: Grafico;
  grafico_por_categoria: Record<string, Grafico>;
  pedidos: Record<string, Pedido[]>;
  top_general: Top[];
  top_por_categoria: Record<string, Top[]>;
}