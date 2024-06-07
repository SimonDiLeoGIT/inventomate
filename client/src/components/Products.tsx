import React from "react"
import { Link } from "react-router-dom"

interface props {
  trend: Trend
}

export const Products: React.FC<props> = ({ trend }) => {

  return (
    <section className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {trend.products.map((product) => {
        return (
          <article className="-bg--color-form-background-semi-white shadow-md -shadow--color-border-light-grey p-2 block relative">
            <figure className="overflow-hidden">
              <div className="h-48 grid place-content-center overflow-hidden">
                <Link to={`./${trend.category_name}/${product.trend_position}`}>
                  <img src={product.pictures[0].url} className=" m-auto h-48 object-contain overflow-hidden duration-500 hover:scale-110" />
                </Link>
              </div>
              <figcaption className="p-2 -text--color-black md:text-base">
                <p className="-bg--color-light-opaque-pink inline-block p-1 text-sm -text--color-semidark-violet font-medium rounded-md">{product.trend_position}° Trend Position</p>
                <p className="h-[3rem] overflow-hidden text-ellipsis font-semibold">{product.name}</p>
              </figcaption>
            </figure>
            {
              product.procesamiento.meses_en_tendencia === 0
              &&
              <p className="-bg--color-semidark-violet -text--color-white  inline-block p-1 text-sm  font-medium rounded-md absolute top-2 right-2">New Trend</p>
            }
          </article>
        )
      })}
    </section>
  )
}