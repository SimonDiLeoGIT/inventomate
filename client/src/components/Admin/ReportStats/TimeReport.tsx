import React, { useEffect, useState } from "react"
import { TableSelector } from "../../TableSelector"
import { NoDataFound } from "../../Errors/NoDataFound"
import { Pagination } from "../../Global/Pagination"
import { ItemData } from "../ReportRating/ItemData"
import { Filters } from "../../Reports/Filters"

interface Filters {
  sort: keyof ReportContent
  order: 'asc' | 'desc'
}

type ReportType = "ANALISIS_DE_TENDENCIA" | "PROYECCION_DE_VENTAS" | "OBSOLESCENCIA" | "SIGUIENTES_PEDIDOS" | "All";

interface props {
  data: TimeReport
  accessToken: string
  getTimeReportsInfo: (accessToken: string, currentPage: number, size: number, sort: keyof ReportContent, order: 'asc' | 'desc', reportType: string | null, from: string | null, to: string | null) => void
}

export const TimeReport: React.FC<props> = ({ data, accessToken, getTimeReportsInfo }) => {

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [filters, setFilters] = useState<Filters>({
    sort: 'id',
    order: 'asc'
  })
  const [reportType, setReportType] = useState<string | null>(null)

  const ascDesc = ['asc', 'desc']
  const types = ["ANALISIS_DE_TENDENCIA", "PROYECCION_DE_VENTAS", "OBSOLESCENCIA", "SIGUIENTES_PEDIDOS", "All"]
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);

  useEffect(() => {
    getTimeReportsInfo(accessToken, currentPage, 10, filters.sort, filters.order, reportType, dateFrom, dateTo)
    console.log('datita: ', data)
  }, [currentPage, filters.order, filters.sort, filters, reportType, dateFrom, dateTo])

  useEffect(() => {
    setTotalPages(data.totalPages)
    console.log('cambió la data')
  }, [data])

  useEffect(() => {
    console.log(filters)
  }, [filters])

  function isKeyOfReportContent(key: any): key is keyof ReportContent {
    const validKeys: Array<keyof ReportContent> = ['id', 'fecha', 'duracionSegundos', 'tipoInforme']
    return validKeys.includes(key);
  }

  function handleSelect(field: keyof ReportContent | string, op: 'asc' | 'desc' | ReportType) {
    if (isKeyOfReportContent(field) && (op === 'asc' || op === 'desc')) {
      setFilters(
        {
          sort: field,
          order: op
        }
      )
    } else {
      op === 'All' ? setReportType(null) : setReportType(op)
    }
  }

  const handlePageClick = (event: any) => {
    const selectedPage = event.selected;
    if (selectedPage > currentPage) {
      if (!data.last)
        setCurrentPage(currentPage + 1)
    } else {
      if (!data.first)
        setCurrentPage(currentPage - 1)
    }
  }

  return (
    <section>
      <Filters
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
      />
      <ul className="rounded-lg overflow-hidden shadow-md -shadow--color-black-shadow">
        <li className="grid grid-cols-7 border-b -bg--color-mate-dark-violet -text--color-white font-bold">
          <div className="flex items-center relative ">
            <p className="p-2">Id</p>
            <TableSelector options={ascDesc} id='id' handleSelect={handleSelect} />
          </div>
          <div className="flex items-center relative col-span-2">
            <p className="p-2">Date</p>
            <TableSelector options={ascDesc} id='fecha' handleSelect={handleSelect} />
          </div>
          <div className="flex items-center relative col-span-2">
            <p className="p-2">Type</p>
            <TableSelector options={types} id='tipoInforme' handleSelect={handleSelect} />
          </div>
          <div className="flex items-center relative col-span-2">
            <p className="p-2">Rate</p>
            <TableSelector options={ascDesc} id='cantEstrellas' handleSelect={handleSelect} />
          </div>
        </li>
        {
          data.content
            &&
            data.content.length === 0
            ?
            <NoDataFound />
            :
            data.content.map((item, index) => {
              return (
                <ul>
                  <ItemData item={item} index={index} />
                </ul>
              )
            })
        }
      </ul>
      <Pagination handlePageClick={handlePageClick} totalPages={totalPages} />
    </section>
  )
}