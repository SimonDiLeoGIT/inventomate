import ReactPaginate from "react-paginate"
import left_arrow from '../../assets/icons/left-arrow.svg'
import right_arrow from '../../assets/icons/right-arrow.svg'
import React from "react"

interface props {
  handlePageClick: (event: any) => void
  totalPages: number
}

export const Pagination: React.FC<props> = ({ handlePageClick, totalPages }) => {
  return (
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
  )
}