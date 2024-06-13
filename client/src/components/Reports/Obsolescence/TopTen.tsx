import React, { useState } from "react"
import { ObsolescenceChart } from "./ObsolescenceChart"
import { TableData } from "./TableData"

interface props {
  obsolescence: Obsolescence
}

export const TopTen: React.FC<props> = ({ obsolescence }) => {

  const [category, setCategory] = useState<string>('General')

  const handleChangeOption = (id: string) => {
    if (id !== undefined) setCategory(id)
  }

  return (
    <>
      <h3 className="font-bold -text--color-mate-dark-violet text-lg">Top Ten Degree of Obsolescence</h3>
      <form className='my-4'>
        <select
          className="w-full -bg--color-border-very-lightest-grey p-2 hover:cursor-pointer rounded-lg shadow-md -shadow--color-light-opaque-pink"
          onChange={(e) => handleChangeOption(e.target.value)}
        >
          <option value={"General"} className="-bg--color-white hover:cursor-pointer">General</option>
          {
            obsolescence && Object.keys(obsolescence.productos_obsoletos).map(categoria => {
              return (
                <option value={categoria} className="-bg--color-white hover:cursor-pointer">{categoria}</option>
              )
            })
          }
        </select>
      </form>
      {
        obsolescence &&
        <ObsolescenceChart obsolescence={obsolescence} category={category} />
      }
      <ul className="my-4 rounded-lg overflow-hidden shadow-md">
        <li className="grid grid-cols-8 border-b p-2 -bg--color-mate-dark-violet -text--color-white font-bold">
          <p >Id</p>
          <p className="col-span-4">Name</p>
          <p className="">Obsolet</p>
          <p className="col-span-2">Degree of Obsolescence</p>
        </li>
        {
          obsolescence &&
          (
            category === "General"
              ?
              obsolescence.grafico_top10_general.X.map((productName, index) => (
                Object.keys(obsolescence.productos_obsoletos).flatMap((categoria) =>
                  obsolescence.productos_obsoletos[categoria].map((product) => (
                    product.nombre === productName
                    &&
                    <TableData key={product.nombre} product={{ ...product, categoria: category }} index={index} />
                  ))
                )
              ))
              :
              obsolescence.grafico_top10_por_categoria[category].X.map((productName, index) => (
                obsolescence.productos_obsoletos[category].map((product) => (
                  product.nombre === productName
                  &&
                  <TableData key={product.nombre} product={{ ...product, categoria: category }} index={index} />
                ))
              ))
          )
        }
      </ul>
    </>
  )
}