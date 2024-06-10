import React from "react"
import { BarChart } from "../Chart/BarChart"

interface props {
  nextOrders: NextOrders
  category: string
}

export const NextOrdersChart: React.FC<props> = ({ nextOrders, category }) => {
  return (
    <section>
      {nextOrders &&
        category === "General"
        ?
        <BarChart grafico={nextOrders?.grafico_general} label="Next Orders" />
        :
        nextOrders && Object.keys(nextOrders.grafico_por_categoria).map(categoria => (
          categoria === category &&
          <BarChart grafico={nextOrders?.grafico_por_categoria[categoria]} label="Next Orders" />
        ))
      }
    </section>
  )
}