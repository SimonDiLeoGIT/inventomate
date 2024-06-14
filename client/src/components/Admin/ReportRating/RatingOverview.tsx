import React, { useEffect, useState } from "react"
import { TableSelector } from "../../TableSelector"
import { NoDataFound } from "../../Errors/NoDataFound"
import { Pagination } from "../../Global/Pagination"
import { getRatings } from "../../../utils/Services/Admin/rating.service"

interface Filters {
  sort: keyof RatingContent
  order: 'asc' | 'desc'
  reportType: string | null
}

interface props {
  data: Rating
  accessToken: string
}

export const RatingOverview: React.FC<props> = ({ data, accessToken }) => {

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [filters, setFilters] = useState<Filters>({
    sort: 'id',
    order: 'asc',
    reportType: null
  })

  useEffect(() => {
    getRatings(accessToken, currentPage, 10, filters.sort, filters.order, filters.reportType)
    console.log(data)
  }, [currentPage, filters])

  useEffect(() => {
    setTotalPages(data.totalPages)
  }, [data])

  function handleSelect(field: string, op: string) {
    setFilters((prev: any) => ({
      ...prev,
      [field]: op
    }))
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

      <ul className="rounded-lg overflow-hidden shadow-md -shadow--color-black-shadow">
        <li className="grid grid-cols-3 border-b -bg--color-mate-dark-violet -text--color-white font-bold">
          <p className="p-2">Id</p>
          <div className="flex items-center relative">
            <p className="p-2">Date</p>
            <TableSelector options={['asc', 'desc']} id='fecha' handleSelect={handleSelect} />
          </div>
          <div className="flex items-center relative">
            <p className="p-2">State</p>
            <TableSelector options={['new', 'viewed', 'all']} id='visto' handleSelect={handleSelect} />
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
                <li className={`grid grid-cols-3 hover:opacity-80 ${(index % 2 === 0) && '-bg--color-border-very-lightest-grey'} `}>
                  {item.id}
                </li>
              )
            })
        }
      </ul>
      <Pagination handlePageClick={handlePageClick} totalPages={totalPages} />
    </section>
  )
}