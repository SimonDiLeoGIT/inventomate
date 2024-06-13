import React from "react"
import { LineChart } from "./LineChart"
import { BarChart } from "../../Chart/BarChart"

interface props {
  product: Product
}

export const ProductStatistics: React.FC<props> = ({ product }) => {
  return (
    <section className="">
      <article>
        <h3 className="font-semibold py-4 text-lg -text--color-mate-dark-violet">Price Data</h3>
        <BarChart grafico={product?.procesamiento.variacion_precio} label="Price Variation" />
        <ul className="w-/full m-auto rounded-lg overflow-hidden shadow-md -shadow--color-black-shadow mt-8">
          <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4 -bg--color-border-very-lightest-grey`}>
            <p>Price Deviation</p>
            <p>{product.procesamiento.desvio_precio}</p>
          </li>
          <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4 `}>
            <p>Price Average</p>
            <p>${product.procesamiento.media_precio}</p>
          </li>
        </ul>
      </article>
      <article>
        <h3 className="font-semibold py-4 text-lg -text--color-mate-dark-violet">Trend Data</h3>
        <LineChart x={product?.procesamiento.variacion_tendencia.X} y={product?.procesamiento.variacion_tendencia.Y} label="Trend Variation" />
        <ul className="w-/full m-auto rounded-lg overflow-hidden shadow-md -shadow--color-black-shadow mt-8">
          <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4 -bg--color-border-very-lightest-grey`}>
            <p>Trend Position Deviation</p>
            <p>{product.procesamiento.desvio_trendPosition}</p>
          </li>
          <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4 `}>
            <p>Trend Position Average</p>
            <p>{product.procesamiento.media_trendPosition}</p>
          </li>
          <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4 -bg--color-border-very-lightest-grey`}>
            <p>Months in Trends</p>
            <p>{product.procesamiento.meses_en_tendencia}</p>
          </li>
        </ul>
      </article>
    </section>
  )
}