import React, { useEffect, useState } from "react";
import { SuggestionJustification } from "./SuggestionJustification";
import { TableSelector } from "../TableSelector";

interface Props {
  nextOrders: NextOrders;
}

export const Overview: React.FC<Props> = ({ nextOrders }) => {
  const [orders, setOrders] = useState<PedidoConCategoria[]>([]);
  const [sortBy, setSortBy] = useState<keyof PedidoConCategoria>('id_producto');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  useEffect(() => {
    const allOrders: PedidoConCategoria[] = Object.entries(nextOrders.pedidos).flatMap(([categoria, pedidos]) =>
      pedidos.map(pedido => ({ ...pedido, categoria }))
    );
    let sortedOrders: PedidoConCategoria[]
    if (sortBy === 'id_producto' || sortBy === 'stock_actual' || sortBy === 'cantidad_a_comprar') {
      sortedOrders = orderByNumber(allOrders, sortBy, sortOrder);
    } else {
      sortedOrders = orderByString(allOrders, sortBy, sortOrder);
    }
    setOrders(sortedOrders);
  }, [nextOrders, sortBy, sortOrder]);

  // Función para ordenar por número
  const orderByNumber = (orders: PedidoConCategoria[], sortBy: keyof PedidoConCategoria, sortOrder: string): PedidoConCategoria[] => {
    return orders.sort((a, b) => {
      const valueA = a[sortBy] as number;
      const valueB = b[sortBy] as number;
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    });
  };

  // Función para ordenar por cadena
  const orderByString = (orders: PedidoConCategoria[], sortBy: keyof PedidoConCategoria, sortOrder: string): PedidoConCategoria[] => {
    return orders.sort((a, b) => {
      const valueA = a[sortBy] as string;
      const valueB = b[sortBy] as string;
      if (sortOrder === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  };


  const handleSelect = (id: keyof PedidoConCategoria, op: string) => {
    setSortBy(id);
    setSortOrder(op);
  };

  return (
    <ul className="my-4 rounded-lg overflow-hidden shadow-md">
      <li className="grid grid-cols-10 border-b p-2 -bg--color-mate-dark-violet -text--color-white font-bold">
        <div className="flex items-center relative">
          <p>Id</p>
          <TableSelector options={['asc', 'desc']} id='id_producto' handleSelect={handleSelect} />
        </div>
        <div
          className="col-span-3 flex items-center relative"
        >
          <p>Name</p>
          <TableSelector options={['asc', 'desc']} id='nombre_producto' handleSelect={handleSelect} />
        </div>
        <div
          className="col-span-2 flex items-center relative"
        >
          <p>Category</p>
          <TableSelector options={['asc', 'desc']} id='nombre_producto' handleSelect={handleSelect} />
        </div>
        <div
          className="col-span-2 flex items-center relative"
        >
          <p>Actual Stock</p>
          <TableSelector options={['asc', 'desc']} id='stock_actual' handleSelect={handleSelect} />
        </div>
        <div
          className="col-span-2 flex items-center relative"
        >
          <p>Quantity To Order</p>
          <TableSelector options={['asc', 'desc']} id='cantidad_a_comprar' handleSelect={handleSelect} />
        </div>
      </li>
      {
        orders.map((order, index) => {
          return (
            <SuggestionJustification order={order} justification={order.justificacion} index={index} category={order.categoria} />
          )
        })
      }
    </ul>
  )
}