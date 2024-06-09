import React, { useEffect, useState } from "react";
import { SuggestionJustification } from "./SuggestionJustification";
import { TableSelector } from "../TableSelector";

interface Props {
  nextOrders: NextOrders;
}

export const Overview: React.FC<Props> = ({ nextOrders }) => {
  const [orders, setOrders] = useState<Pedido[]>([]);
  const [sortBy, setSortBy] = useState<keyof Pedido>('id_producto');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  useEffect(() => {
    const allOrders = Object.values(nextOrders.pedidos).flatMap(categoria => categoria);
    let sortedOrders: Pedido[]
    if (sortBy === 'id_producto' || sortBy === 'stock_actual' || sortBy === 'cantidad_a_comprar') {
      sortedOrders = orderByNumber(allOrders, sortBy, sortOrder);
    } else {
      sortedOrders = orderByString(allOrders, sortBy, sortOrder);
    }
    setOrders(sortedOrders);
  }, [nextOrders, sortBy, sortOrder]);

  const orderByString = (orders: Pedido[], sortBy: keyof Pedido, sortOrder: string) => {
    return orders.slice().sort((a, b) => {
      let aValue: string | number = a[sortBy];
      let bValue: string | number = b[sortBy];

      if (typeof aValue === 'number') aValue = aValue.toString();
      if (typeof bValue === 'number') bValue = bValue.toString();

      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  };

  const orderByNumber = (orders: Pedido[], sortBy: keyof Pedido, sortOrder: string) => {
    return orders.slice().sort((a, b) => {
      let aValue: string | number = a[sortBy];
      let bValue: string | number = b[sortBy];

      if (typeof aValue === 'string') aValue = Number(aValue)
      if (typeof bValue === 'string') bValue = Number(bValue)

      if (sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  };


  const handleSelect = (id: keyof Pedido, op: string) => {
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
        // Object.keys(nextOrders.pedidos).map((categoria) => (
        //   nextOrders.pedidos[categoria].map((order, index) => (
        //     <SuggestionJustification order={order} justification={order.justificacion} index={index} category={categoria} />
        //   ))
        // ))
        orders.map((order, index) => {
          return (
            <SuggestionJustification order={order} justification={order.justificacion} index={index} category='' />
          )
        })
      }
    </ul>
  )
}