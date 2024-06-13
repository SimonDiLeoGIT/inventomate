import React, { useEffect } from "react"

interface props {
  product: ProductForecast
  index: number
}

export const TableData: React.FC<props> = ({ product, index }) => {


  useEffect(() => {
    console.log(index)
  })

  return (
    <>
      <li
        className={`grid grid-cols-10 hover:cursor-pointer hover:opacity-80 ${(index % 2 === 0) && '-bg--color-border-very-lightest-grey'}`}
      >
        <p className="p-2">{product.id_producto}</p>
        <p className="p-2 col-span-3">{product.nombre_producto}</p>
        <p className={`p-2 col-span-2 font-semibold -text--color-ful-red`}>${product.inversion}</p>
        <p className={`p-2 col-span-2 font-semibold -text--color-green`}>${product.ganancia}</p>
        <p className={`p-2 col-span-2 font-semibold ${product.diferencia >= 0 ? '-text--color-green' : '-text--color-ful-red'}`}>${product.diferencia}</p>
      </li>
    </>
  )
}