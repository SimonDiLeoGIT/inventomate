import { Link } from "react-router-dom"
import '../../styles/Reports.css'
import { useEffect, useState } from "react"
import { Filters } from "./Filters"
import { Pagination } from "../Global/Pagination"
import { TableSelector } from "../TableSelector"
import { NoDataFound } from "../Errors/NoDataFound"

interface props {
  reports: Report
  idBranch: string
  getReport: (idBranch: string, currentPage: number, sortOrder: 'asc' | 'desc', dateFrom: string | null, dateTo: string | null, viewed: boolean | null) => void
}

export const Reports: React.FC<props> = ({ reports, idBranch, getReport }) => {

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);
  const [viewed, setViewed] = useState<boolean | null>(null)
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    getReport(idBranch, currentPage, sortOrder, dateFrom, dateTo, viewed)
    console.log(reports)
  }, [currentPage, sortOrder, dateFrom, dateTo, viewed])

  useEffect(() => {
    setTotalPages(reports.totalPages)
  }, [reports])

  const handlePageClick = (event: any) => {
    const selectedPage = event.selected;
    if (selectedPage > currentPage) {
      if (!reports.last)
        setCurrentPage(currentPage + 1)
    } else {
      if (!reports.first)
        setCurrentPage(currentPage - 1)
    }
  }

  function handleSelect(id: keyof Content, op: string) {
    if (id === "id") {
      sortByID(op)
    } else {
      if (id === "visto") {
        sortByViewed(op)
      }
    }
  }

  function sortByID(op: string) {
    if (op === "asc" || op === "desc") {
      setSortOrder(op)
    }
  }

  function sortByViewed(op: string) {
    if (op === 'viewed') {
      setViewed(true)
    } else {
      if (op === 'new') {
        setViewed(false)
      } else {
        if (op === 'all') {
          setViewed(null)
        }
      }
    }
  }


  return (
    <>
      <Filters
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
      />
      <ul className="rounded-lg overflow-hidden shadow-md -shadow--color-black-shadow">
        <li className="grid grid-cols-3 border-b -bg--color-mate-dark-violet -text--color-white font-bold">
          <div className="flex items-center relative">
            <p className="p-2">Id</p>
            <TableSelector options={['asc', 'desc']} id='id' handleSelect={handleSelect} />
          </div>
          <p className="p-2">Date</p>
          <div className="flex items-center relative">
            <p className="p-2">State</p>
            <TableSelector options={['new', 'viewed', 'all']} id='visto' handleSelect={handleSelect} />
          </div>
        </li>
        {
          reports.content
            &&
            reports.content.length === 0
            ?
            <NoDataFound />
            :
            reports.content.map((report, index) => {
              return (
                <li className={`grid grid-cols-3 hover:opacity-80 ${(index % 2 === 0) && '-bg--color-border-very-lightest-grey'} relative ${!report.visto && '-bg--color-light-opaque-pink sombreado'}`}>
                  <Link
                    to={`./${idBranch}/${report.id}`}
                    className="block p-2"
                    id={`${index}`}
                  >
                    {report.id}
                  </Link>
                  <Link
                    to={`./${idBranch}/${report.id}`}
                    className="flex p-2"
                  >
                    {report.fecha}
                  </Link>
                  <Link
                    to={`./${idBranch}/${report.id}`}
                    className="flex p-2"
                  >
                    {
                      !report.visto
                        ?
                        <p className="-bg--color-light-opaque-pink inline-block p-1 text-xs -text--color-semidark-violet font-medium rounded-md opacidad">New</p>
                        :
                        <p className="text-xs font-medium ">Viewed</p>
                    }
                  </Link>
                </li>
              )
            })
        }
      </ul>
      <Pagination handlePageClick={handlePageClick} totalPages={totalPages} />
    </>
  )
}