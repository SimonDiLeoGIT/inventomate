import React, { useState } from "react"
import close_icon from '../../../assets/icons/close.svg'

interface props {
  item: ErrorContent
  index: number
}

export const ItemData: React.FC<props> = ({ item, index }) => {

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
        className={`grid grid-cols-7 hover:cursor-pointer hover:opacity-80 ${(index % 2 === 0) && '-bg--color-border-very-lightest-grey'}`}
        onClick={handleMenuOpen}
      >
        <p className="p-2">{item.id}</p>
        <p className="p-2 col-span-2">{item.fecha}</p>
        <p className="p-2 col-span-2">{item.titulo}</p>
        <p className="p-2 col-span-2">{item.codigo}</p>
      </li>

      <aside className={`fixed w-screen h-screen overflow-hidden top-0 left-0 ${!isOpen && 'hidden'} opacity-animation grid place-content-center`}>
        <section className='-bg--color-white p-4 relative w-screen max-w-xl shadow-lg -shadow--color-black-shadow rounded-lg'>
          <header>
            <h1 className="text-lg font-semibold">{item.titulo}</h1>
            <button
              className="absolute right-4 top-4"
              onClick={() => handleMenuOpen()}
            >
              <img src={close_icon} className="w-5" />
            </button>
          </header>
          <section>
            <ul className="py-2">
              <li className=""><span className="mr-2 font-semibold -text--color-mate-dark-violet">Date:</span> {item.fecha}</li>
              <li className=""><span className="mr-2 font-semibold -text--color-mate-dark-violet">Hour:</span> {item.hora}</li>
              <li className=""><span className="mr-2 font-semibold -text--color-mate-dark-violet">Code:</span> {item.codigo}</li>
              <li className=""><span className="mr-2 font-semibold -text--color-mate-dark-violet">Details:</span> {item.detalle}</li>
            </ul>
          </section>
        </section>
      </aside>
    </>
  )
}