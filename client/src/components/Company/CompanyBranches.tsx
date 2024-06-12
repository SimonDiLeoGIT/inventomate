import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { NoDataFound } from "../Errors/NoDataFound"
import { TableSelector } from "../TableSelector"
import { Searcher } from "../Searcher"
import { Pagination } from "../Global/Pagination"

interface props {
  branches: Branch[]
  user: UserCompany
}

export const CompanyBranches: React.FC<props> = ({ branches, user }) => {

  const [sortBy, setSortBy] = useState<keyof Branch>('idSucCliente');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [data, setData] = useState<Branch[]>([])
  const totalArticles = 10
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [searchInput, setSearchInput] = useState<string>('')

  useEffect(() => {
    let sortedBranches
    if (sortBy === 'idSucCliente') {
      sortedBranches = orderByNumber(branches, sortBy, sortOrder);
      console.log(sortedBranches)
    } else {
      sortedBranches = orderByString(branches, sortBy, sortOrder);
    }
    setData(sortedBranches)
  }, [branches, sortBy, sortOrder]);

  useEffect(() => {
    setData(branches.slice(currentPage, (currentPage) + totalArticles))
    setTotalPages(branches?.length / totalArticles)
    searchInput !== '' && search(searchInput)
  }, [branches, currentPage]);

  const orderByNumber = (branches: Branch[], sortBy: keyof Branch, sortOrder: string): Branch[] => {
    return branches.sort((a, b) => {
      const valueA = a[sortBy] as number;
      const valueB = b[sortBy] as number;
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    });
  };

  const orderByString = (branches: Branch[], sortBy: keyof Branch, sortOrder: string): Branch[] => {
    return branches.sort((a, b) => {
      const valueA = a[sortBy] as string;
      const valueB = b[sortBy] as string;
      if (sortOrder === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  };

  const handleSelect = (id: keyof Branch, op: string) => {
    setSortBy(id)
    setSortOrder(op)
  }

  const handlePageClick = (event: any) => {
    const next = (event.selected * totalArticles) % branches.length;
    setCurrentPage(next)
    setData(branches.slice(next, (next) + totalArticles))
    window.scrollTo(0, 0);
  }

  const handleSearchChange = (input: string) => {
    setSearchInput(input)
    if (input === '') {
      setData(branches.slice(currentPage, (currentPage) + totalArticles))
    } else {
      search(input)
    }
  }

  function search(input: string) {
    let newData: Branch[] = []
    branches.map(branch => {
      const subString = branch.nombre.substring(0, input.length)
      if (subString.toLocaleUpperCase() === input.toLocaleUpperCase()) newData.push(branch)
    })
    setData(newData.slice(currentPage, (currentPage) + totalArticles))
  }


  return (
    <section>
      {
        currentPage === 0
        &&
        <div className="grid grid-cols-2">
          <Searcher handleSearchChange={handleSearchChange} />
          {
            user?.roles.some(rol => rol.idRol === 1)
            &&
            <Link to='/company/register-branch' className="-bg--color-border-very-lightest-grey p-2 rounded-lg font-semibold -text--color-mate-dark-violet w-32 text-center m-auto mr-0">+ Add Branch</Link>
          }
        </div>
      }
      <ul className="my-4 grid w-full m-auto rounded-lg overflow-hidden shadow-md">
        <li className="grid grid-cols-5 border-b p-2 -bg--color-mate-dark-violet -text--color-white font-bold">
          <div className="flex items-center relative">
            <p>Id</p>
            <TableSelector options={['asc', 'desc']} id='idSucCliente' handleSelect={handleSelect} />
          </div>
          <p className="col-span-2">Name</p>
          <p className="col-span-2">Location</p>
        </li>
        {data?.length === 0 ?
          <NoDataFound />
          : (
            data?.map((branch, index) => {
              return (
                <li className={`grid grid-cols-5 hover:opacity-60 ${(index % 2 === 0) && '-bg--color-border-very-lightest-grey'}`}>
                  <p><Link to={`/branches/branch/${branch.idSucursal}`} className="block p-2">{branch.idSucCliente}</Link></p>
                  <p className="col-span-2"><Link to={`/branches/branch/${branch.idSucursal}`} className="block p-2">{branch.nombre}</Link></p>
                  <p className="col-span-2"><Link to={`/branches/branch/${branch.idSucursal}`} className="block p-2">{branch.ubicacion}</Link></p>
                </li>
              )
            })
          )
        }
      </ul>
      <Pagination handlePageClick={handlePageClick} totalPages={totalPages} />
    </section>
  )
}