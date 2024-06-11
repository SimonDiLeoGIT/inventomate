import React, { useState } from "react"
import { NextOrdersChart } from "./NextOrdersChart"
import { SuggestionJustification } from "./SuggestionJustification"

interface props {
  nextOrders: NextOrders
}

export const TopTen: React.FC<props> = ({ nextOrders }) => {

  const [category, setCategory] = useState<string>('General')

  const handleChangeOption = (id: string) => {
    if (id !== undefined) setCategory(id)
  }

  return (
    <>
      <h3 className="font-bold -text--color-mate-dark-violet text-lg">Top Ten Products To Order</h3>
      <form className='my-4'>
        <select
          className="w-full -bg--color-border-very-lightest-grey p-2 hover:cursor-pointer rounded-lg shadow-md -shadow--color-light-opaque-pink"
          onChange={(e) => handleChangeOption(e.target.value)}
        >
          <option value={"General"} className="-bg--color-white hover:cursor-pointer">General</option>
          {
            nextOrders && Object.keys(nextOrders.pedidos).map(categoria => {
              return (
                <option value={categoria} className="-bg--color-white hover:cursor-pointer">{categoria}</option>
              )
            })
          }
        </select>
      </form>
      {
        nextOrders &&
        <NextOrdersChart nextOrders={nextOrders} category={category} />
      }
      <ul className="my-4 rounded-lg overflow-hidden shadow-md">
        <li className="grid grid-cols-10 border-b p-2 -bg--color-mate-dark-violet -text--color-white font-bold">
          <p >Id</p>
          <p className="col-span-3">Name</p>
          <p className="col-span-2">Category</p>
          <p className="col-span-2">Actual Stock</p>
          <p className="col-span-2">Quantity To Order</p>
        </li>
        {
          nextOrders &&
          (
            category === "General"
              ?
              nextOrders.top_general.map((order, index) => {
                return (
                  Object.keys(nextOrders.pedidos).map((categoria) => (
                    nextOrders.pedidos[categoria].map((justificatedOrder) => (
                      justificatedOrder.id_producto === order.id_producto &&
                      <SuggestionJustification order={order} justification={justificatedOrder.justificacion} index={index} category={categoria} />
                    ))
                  ))
                )
              })
              :
              nextOrders.top_por_categoria[category].flatMap((order, index) =>
                nextOrders.pedidos[category].flatMap((justificatedOrder) =>
                  justificatedOrder.id_producto === order.id_producto
                    ? <SuggestionJustification
                      key={`${order.id_producto}-${index}`}
                      order={order}
                      justification={justificatedOrder.justificacion}
                      index={index}
                      category={category}
                    />
                    : []
                ))
          )
        }
      </ul>
    </>
  )
}