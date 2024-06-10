import React, { useEffect, useState } from "react";
import { TableSelector } from "../TableSelector";
import { Searcher } from "../Searcher";
import { Pagination } from "../Global/Pagination";
import { TableData } from "./TableData";
import { NoDataFound } from "../Errors/NoDataFound";

interface Props {
  obsolescence: Obsolescence;
}

export const Overview: React.FC<Props> = ({ obsolescence }) => {

  const [obsoletProducts, setObsoletProducts] = useState<ObsoletProductsWithCategory[]>([]);
  const [sortBy, setSortBy] = useState<keyof ObsoletProductsWithCategory>('id_producto');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const totalArticles = 10
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [data, setData] = useState<ObsoletProductsWithCategory[]>(obsoletProducts.slice(currentPage, totalArticles))
  const [searchInput, setSearchInput] = useState<string>('')

  useEffect(() => {
    const allObsoletProducts: ObsoletProductsWithCategory[] = Object.entries(obsolescence.productos_obsoletos).flatMap(([categoria, products]) =>
      products.map(product => ({ ...product, categoria }))
    );
    let sortedOrders: ObsoletProductsWithCategory[]
    if (sortBy === 'id_producto' || sortBy === 'OG') {
      sortedOrders = productByNumber(allObsoletProducts, sortBy, sortOrder);
    } else {
      if (sortBy === 'obsoleto') {
        sortedOrders = productByBoolean(allObsoletProducts, sortBy, sortOrder);
      } else {
        sortedOrders = productByString(allObsoletProducts, sortBy, sortOrder);
      }
    }
    setObsoletProducts(sortedOrders)
  }, [obsolescence, sortBy, sortOrder]);


  useEffect(() => {
    setData(obsoletProducts.slice(currentPage, (currentPage) + totalArticles))
    setTotalPages(obsoletProducts?.length / totalArticles)
    searchInput !== '' && search(searchInput)
  }, [obsoletProducts, currentPage]);

  const productByNumber = (obsoletProducts: ObsoletProductsWithCategory[], sortBy: keyof ObsoletProductsWithCategory, sortOrder: string): ObsoletProductsWithCategory[] => {
    return obsoletProducts.sort((a, b) => {
      const valueA = a[sortBy] as number;
      const valueB = b[sortBy] as number;
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    });
  };

  const productByString = (obsoletProducts: ObsoletProductsWithCategory[], sortBy: keyof ObsoletProductsWithCategory, sortOrder: string): ObsoletProductsWithCategory[] => {
    return obsoletProducts.sort((a, b) => {
      const valueA = a[sortBy] as string;
      const valueB = b[sortBy] as string;
      if (sortOrder === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  };

  const productByBoolean = (obsoletProducts: ObsoletProductsWithCategory[], sortBy: keyof ObsoletProductsWithCategory, filterValue: string): ObsoletProductsWithCategory[] => {
    if (filterValue === 'all') {
      return obsoletProducts;
    }

    const booleanValue = filterValue === 'true';

    return obsoletProducts.filter(product => product[sortBy] === booleanValue);
  };

  const handleSelect = (id: keyof ObsoletProductsWithCategory, op: string) => {
    setSortBy(id)
    setSortOrder(op)
  }

  const handlePageClick = (event: any) => {
    const next = (event.selected * totalArticles) % obsoletProducts.length;
    setCurrentPage(next)
    setData(obsoletProducts.slice(next, (next) + totalArticles))
    window.scrollTo(0, 0);
  }

  const handleSearchChange = (input: string) => {
    setSearchInput(input)
    if (input === '') {
      setData(obsoletProducts.slice(currentPage, (currentPage) + totalArticles))
    } else {
      search(input)
    }
  }

  function search(input: string) {
    let newData: ObsoletProductsWithCategory[] = []
    obsoletProducts.map(product => {
      const subString = product.nombre.substring(0, input.length)
      if (subString.toLocaleUpperCase() === input.toLocaleUpperCase()) newData.push(product)
    })
    setData(newData.slice(currentPage, (currentPage) + totalArticles))
  }

  return (
    <section>
      {
        currentPage === 0
        &&
        <Searcher handleSearchChange={handleSearchChange} />
      }
      <ul className="my-4 rounded-lg overflow-hidden shadow-md">
        <li className="grid grid-cols-8 bproduct-b p-2 -bg--color-mate-dark-violet -text--color-white font-bold">
          <div className="flex items-center relative">
            <p>Id</p>
            <TableSelector options={['asc', 'desc']} id='id_producto' handleSelect={handleSelect} />
          </div>
          <div
            className="col-span-4 flex items-center relative"
          >
            <p>Name</p>
            <TableSelector options={['asc', 'desc']} id='nombre' handleSelect={handleSelect} />
          </div>
          <div
            className="flex items-center relative"
          >
            <p>Obsolet</p>
            <TableSelector options={['true', 'false', 'all']} id='obsoleto' handleSelect={handleSelect} />
          </div>
          <div
            className="col-span-2 flex items-center relative"
          >
            <p>Degree of Obsolescence</p>
            <TableSelector options={['asc', 'desc']} id='OG' handleSelect={handleSelect} />
          </div>
        </li>
        {
          data.length === 0
            ?
            <NoDataFound />
            :
            data.map((product, index) => {
              return (
                <TableData product={product} index={index} />
              )
            })
        }
      </ul>
      <Pagination handlePageClick={handlePageClick} totalPages={totalPages} />
    </section>
  )
}