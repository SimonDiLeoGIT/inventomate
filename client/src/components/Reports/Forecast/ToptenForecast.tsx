import React, { useEffect, useState } from "react"
import { BarChart } from "../../Chart/BarChart"
import { TableData } from "./TableData"

interface props {
  forecast: Forecast
  productEstimations: Record<string, ProductForecast[]>
}

export const TopTenForecast: React.FC<props> = ({ forecast, productEstimations }) => {

  const [category, setCategory] = useState<string>('General')
  const [chart, setChart] = useState<Charts>()

  useEffect(() => {
    if (category === 'General') {
      setChart(forecast.grafico_general_top10)
    } else {
      setChart(forecast.grafico_por_categoria_top10[category])
    }
  }, [category])

  const handleChangeOption = (cat: string) => {
    if (cat !== undefined) setCategory(cat)
  }

  return (
    <>
      <h3 className="font-bold -text--color-mate-dark-violet text-lg">Top Ten Sales</h3>
      <form className='my-4'>
        <select
          className="w-full -bg--color-border-very-lightest-grey p-2 hover:cursor-pointer rounded-lg shadow-md -shadow--color-light-opaque-pink"
          onChange={(e) => handleChangeOption(e.target.value)}
        >
          <option value={"General"} className="-bg--color-white hover:cursor-pointer">General</option>
          {
            forecast && Object.keys(productEstimations).map(categoria => {
              return (
                <option value={categoria} className="-bg--color-white hover:cursor-pointer">{categoria}</option>
              )
            })
          }
        </select>
      </form>
      {
        forecast && chart &&
        <BarChart grafico={chart} label={category} />
      }
      <ul className="my-4 rounded-lg overflow-hidden shadow-md">
        <li className="grid grid-cols-10 border-b p-2 -bg--color-mate-dark-violet -text--color-white font-bold">
          <p >Id</p>
          <p className="col-span-3">Name</p>
          <p className="col-span-2">Investment</p>
          <p className="col-span-2">Profit</p>
          <p className="col-span-2">Difference</p>
        </li>
        {
          forecast &&
          (
            category === "General"
              ?
              forecast.grafico_general_top10.X.map((p, index) => {
                return (
                  Object.keys(productEstimations).map((categoria) => (
                    productEstimations[categoria].map((producData) => (
                      producData.nombre_producto === p &&
                      <TableData product={producData} index={index} />
                    ))
                  ))
                )
              })
              :
              forecast.grafico_por_categoria_top10[category].X.map((p, index) =>
                productEstimations[category].flatMap((producData) =>
                  producData.nombre_producto === p &&
                  <TableData product={producData} index={index} />
                ))
          )
        }
      </ul>
    </>
  )
}