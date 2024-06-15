import React, { useState } from "react"
import close_icon from '../../../assets/icons/close.svg'

interface props {
  order: Top | Pedido
  justification: string
  index: number
  category: string
}

export const SuggestionJustification: React.FC<props> = ({ order, index, category, justification }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleMenuOpen() {
    !isOpen ?
      document.body.classList.add('none-scroll')
      :
      document.body.classList.remove('none-scroll')
    setIsOpen(!isOpen)
  }

  return (
    <>
      <li
        className={`grid grid-cols-10 hover:cursor-pointer hover:opacity-80 ${(index % 2 === 0) && '-bg--color-border-very-lightest-grey'}`}
        onClick={handleMenuOpen}
      >
        <p className="p-2">{order.id_producto}</p>
        <p className="p-2 col-span-3">{order.nombre_producto}</p>
        <p className="p-2 col-span-2">{category}</p>
        <p className="p-2 col-span-2 -text--color-ful-red font-semibold">{order.stock_actual}</p>
        <p className="p-2 col-span-2 -text--color-green font-semibold">{order.cantidad_a_comprar}</p>
      </li>

      <aside className={`fixed w-screen h-screen overflow-hidden top-0 left-0 ${!isOpen && 'hidden'} opacity-animation grid place-content-center`}>
        <section className='-bg--color-white p-4 relative w-screen max-w-xl shadow-lg -shadow--color-black-shadow rounded-lg'>
          <header>
            <h1 className="text-lg font-semibold">{order.nombre_producto}</h1>
            <button
              className="absolute right-4 top-4"
              onClick={() => handleMenuOpen()}
            >
              <img src={close_icon} className="w-5" />
            </button>
          </header>
          <ul className="grid grid-cols-3 py-2">
            <li className=""><span className="mr-2 font-semibold -text--color-mate-dark-violet">Product ID:</span> {order.id_producto}</li>
            <li className="-text--color-ful-red font-semibold"><span className="mr-2 font-semibold -text--color-mate-dark-violet">Actual Stock:</span> {order.stock_actual}</li>
            <li className="-text--color-green font-semibold"><span className="mr-2 font-semibold -text--color-mate-dark-violet">Quantity to Order: </span>{order.cantidad_a_comprar}</li>
          </ul>
          <p className="mt-2 font-bold -text--color-mate-dark-violet">Justification</p>
          <p className="">{justification}</p>
        </section>
      </aside>
    </>
  )
}