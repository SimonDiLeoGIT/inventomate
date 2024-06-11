import React from "react"
import { ObsolescenceBarChart } from "./ObsolesenceBarChart"

interface props {
  obsolescence: Obsolescence
  category: string
}

export const ObsolescenceChart: React.FC<props> = ({ obsolescence, category }) => {
  return (
    <section>
      {obsolescence &&
        category === "General"
        ?
        <ObsolescenceBarChart grafico={obsolescence?.grafico_top10_general} label="Degree of Obsolescence" />
        :
        obsolescence && Object.keys(obsolescence.grafico_top10_por_categoria).map(categoria => (
          categoria === category &&
          <ObsolescenceBarChart grafico={obsolescence?.grafico_top10_por_categoria[categoria]} label="Degree of Obsolescence" />
        ))
      }
    </section>
  )
}