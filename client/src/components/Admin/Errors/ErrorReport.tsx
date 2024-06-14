import React, { useEffect, useState } from "react"
import { TableSelector } from "../../TableSelector"
import { Pagination } from "../../Global/Pagination"
import { ItemData } from "./ItemData"
import { Filters } from "../../Reports/Filters"
import { NoDataFound } from "../../Errors/NoDataFound"

interface Filters {
  sort: keyof ErrorContent
  order: 'asc' | 'desc'
}

interface props {
  data: Errors
  accessToken: string
  getErrorssInfo: (accessToken: string, currentPage: number, size: number, sort: keyof ErrorContent, order: 'asc' | 'desc', from: string | null, to: string | null) => void
}

export const ErrorsReport: React.FC<props> = ({ data, accessToken, getErrorssInfo }) => {

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [filters, setFilters] = useState<Filters>({
    sort: 'id',
    order: 'asc'
  })

  const ascDesc = ['asc', 'desc']
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);

  useEffect(() => {
    getErrorssInfo(accessToken, currentPage, 10, filters.sort, filters.order, dateFrom, dateTo)
    console.log('datita: ', data)
  }, [currentPage, filters.order, filters.sort, filters, dateFrom, dateTo])

  useEffect(() => {
    setTotalPages(data.totalPages)
    console.log('cambió la data')
  }, [data])

  useEffect(() => {
    console.log(filters)
  }, [filters])

  function handleSelect(field: keyof ErrorContent, op: 'asc' | 'desc') {
    setFilters(
      {
        sort: field,
        order: op
      }
    )
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
            <p className="p-2">Title</p>
            <TableSelector options={ascDesc} id='titulo' handleSelect={handleSelect} />
          </div>
          <div className="flex items-center relative col-span-2">
            <p className="p-2">Code</p>
            <TableSelector options={ascDesc} id='codigo' handleSelect={handleSelect} />
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