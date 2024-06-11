import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface props {
  report: Report
  idBranch: string
  index: number
}

export const ReportWithType: React.FC<props> = ({ report, idBranch, index }) => {

  const [type, setType] = useState<string>('')

  useEffect(() => {
    if (report.tipoInforme === 'OBSOLESCENCIA') setType('obsolescence')
    if (report.tipoInforme === 'PROYECCION_DE_VENTAS') setType('sales-forecasting')
    if (report.tipoInforme === 'ANALISIS_DE_TENDENCIA') setType('new-trends')
    if (report.tipoInforme === 'SIGUIENTES_PEDIDOS') setType('next-orders')
  }, [report])

  return (
    <li className={`grid grid-cols-3 hover:opacity-80 ${(index % 2 === 0) && '-bg--color-border-very-lightest-grey'} relative ${!report.visto && '-bg--color-light-opaque-pink sombreado'}`}>
      <Link
        to={`./${type}/${idBranch}/${report.id}`}
        className="block p-2"
        id={`${index}`}
      >
        {report.id}
      </Link>
      <Link
        to={`./${type}/${idBranch}/${report.id}`}
        className="block p-2"
        id={`${index}`}
      >
        {type}
      </Link>
      <Link
        to={`./${type}/${idBranch}/${report.id}`}
        className="flex p-2"
      >
        {report.fecha}
        {
          !report.visto
          &&
          <p className="-bg--color-light-opaque-pink inline-block p-1 text-xs -text--color-semidark-violet font-medium rounded-md m-auto mr-0 opacidad">New</p>
        }
      </Link>
    </li>
  )
}