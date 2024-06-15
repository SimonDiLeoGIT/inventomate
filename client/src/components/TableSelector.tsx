import React, { useState } from "react"
import down_arrow from '../assets/icons/down-arrow.svg'

interface props {
  options: string[]
  id: any
  handleSelect: (id: any, op: any) => void
}

export const TableSelector: React.FC<props> = ({ options, id, handleSelect }) => {


  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleMenuOpen() {
    setIsOpen(!isOpen)
  }

  function handleClik(id: any, op: string) {
    handleSelect(id, op)
    handleMenuOpen()
  }


  return (
    <>
      <button
        className="m-auto mr-4"
        onClick={() => handleMenuOpen()}
      >
        <img src={down_arrow} className="w-4" />
      </button>

      <aside className={`absolute right-4 top-6 w-16 ${!isOpen && 'hidden'} -bg--color-light-pink z-50 rounded-md overflow-hidden shadow-md -shadow--color-semidark-violet `}>
        <ul className="text-sm">
          {
            options.map(op => {
              return (
                <li className="-text--color-black font-normal ">
                  <button
                    className="block text-start w-12 px-2 hover:opacity-80"
                    onClick={() => handleClik(id, op)}
                  >
                    {op}
                  </button>
                </li>
              )
            })
          }
        </ul>
      </aside>
    </>
  )
}