import React, { useEffect, useState } from "react";
import { SuggestionJustification } from "./SuggestionJustification";
import { TableSelector } from "../TableSelector";
import ReactPaginate from "react-paginate";
import left_arrow from '../../assets/icons/left-arrow.svg'
import right_arrow from '../../assets/icons/right-arrow.svg'
import { Searcher } from "../Searcher";

interface Props {
  nextOrders: NextOrders;
}

export const Overview: React.FC<Props> = ({ nextOrders }) => {

  const [orders, setOrders] = useState<PedidoConCategoria[]>([]);
  const [sortBy, setSortBy] = useState<keyof PedidoConCategoria>('id_producto');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const totalArticles = 10
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [data, setData] = useState<PedidoConCategoria[]>(orders.slice(currentPage, totalArticles))

  useEffect(() => {
    const allOrders: PedidoConCategoria[] = Object.entries(nextOrders.pedidos).flatMap(([categoria, pedidos]) =>
      pedidos.map(pedido => ({ ...pedido, categoria }))
    );
    let sortedOrders: PedidoConCategoria[]
    if (sortBy === 'id_producto' || sortBy === 'stock_actual' || sortBy === 'cantidad_a_comprar') {
      sortedOrders = orderByNumber(allOrders, sortBy, sortOrder);
    } else {
      sortedOrders = orderByString(allOrders, sortBy, sortOrder);
    }
    setOrders(sortedOrders);
  }, [nextOrders, sortBy, sortOrder]);



  useEffect(() => {
    setData(orders.slice(currentPage, (currentPage) + totalArticles))
    setTotalPages(orders?.length / totalArticles)
  }, [orders, currentPage]);


  // Función para ordenar por número
  const orderByNumber = (orders: PedidoConCategoria[], sortBy: keyof PedidoConCategoria, sortOrder: string): PedidoConCategoria[] => {
    return orders.sort((a, b) => {
      const valueA = a[sortBy] as number;
      const valueB = b[sortBy] as number;
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    });
  };

  // Función para ordenar por cadena
  const orderByString = (orders: PedidoConCategoria[], sortBy: keyof PedidoConCategoria, sortOrder: string): PedidoConCategoria[] => {
    return orders.sort((a, b) => {
      const valueA = a[sortBy] as string;
      const valueB = b[sortBy] as string;
      if (sortOrder === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  };


  const handleSelect = (id: keyof PedidoConCategoria, op: string) => {
    setSortBy(id);
    setSortOrder(op);
  };

  const handlePageClick = (event: any) => {
    const next = (event.selected * totalArticles) % orders.length;
    setCurrentPage(next)
    setData(orders.slice(next, (next) + totalArticles))
    window.scrollTo(0, 0);
  }

  const handleSearchChange = (input: string) => {
    if (input === '') {
      setData(orders.slice(currentPage, (currentPage) + totalArticles))
    } else {
      search(input)
    }
  }

  function search(input: string) {
    let newData: PedidoConCategoria[] = []
    orders.map(order => {
      const subString = order.nombre_producto.substring(0, input.length)
      if (subString.toLocaleUpperCase() === input.toLocaleUpperCase()) newData.push(order)
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
        <li className="grid grid-cols-10 border-b p-2 -bg--color-mate-dark-violet -text--color-white font-bold">
          <div className="flex items-center relative">
            <p>Id</p>
            <TableSelector options={['asc', 'desc']} id='id_producto' handleSelect={handleSelect} />
          </div>
          <div
            className="col-span-3 flex items-center relative"
          >
            <p>Name</p>
            <TableSelector options={['asc', 'desc']} id='nombre_producto' handleSelect={handleSelect} />
          </div>
          <div
            className="col-span-2 flex items-center relative"
          >
            <p>Category</p>
            <TableSelector options={['asc', 'desc']} id='nombre_producto' handleSelect={handleSelect} />
          </div>
          <div
            className="col-span-2 flex items-center relative"
          >
            <p>Actual Stock</p>
            <TableSelector options={['asc', 'desc']} id='stock_actual' handleSelect={handleSelect} />
          </div>
          <div
            className="col-span-2 flex items-center relative"
          >
            <p>Quantity To Order</p>
            <TableSelector options={['asc', 'desc']} id='cantidad_a_comprar' handleSelect={handleSelect} />
          </div>
        </li>
        {
          data.map((order, index) => {
            return (
              <SuggestionJustification order={order} justification={order.justificacion} index={index} category={order.categoria} />
            )
          })
        }

      </ul>
      <footer className='w-full mt-6'>
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <img src={right_arrow} className="w-4 " />
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          previousLabel={
            <img src={left_arrow} className="w-4" />
          }
          renderOnZeroPageCount={null}
          containerClassName=" flex justify-center hover:cursor-pointer  m-auto"
          pageLinkClassName="p-1 md:p-2"
          pageClassName="p-2 md:p-2 rounded-lg -text--color-black hover:-bg--color-light-pink"
          activeClassName="-bg--color-light-opaque-pink -text--color-blak hover:-bg--color-light-grey-violet"
          previousClassName="h-8 w-4 md:w-8 flex items-center justify-center -bg--color-semidark-violet rounded-lg m-auto mr-1 hover:opacity-80"
          nextClassName="h-8 w-4 md:w-8 flex items-center justify-center -bg--color-semidark-violet rounded-lg m-auto ml-1 hover:opacity-80"
        />
      </footer>
    </section>
  )
}