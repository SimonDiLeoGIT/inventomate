import React, { useState } from "react"
import close_icon from '../../../assets/icons/close.svg'

interface props {
  item: ReportContent
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
        <p className="p-2 col-span-2">{item.informe.tipoInforme}</p>
        <p className="p-2 col-span-2">{item.duracionSegundos} sec.</p>
      </li>

      <aside className={`fixed w-screen h-screen overflow-hidden top-0 left-0 ${!isOpen && 'hidden'} opacity-animation grid place-content-center`}>
        <section className='-bg--color-white p-4 relative w-screen max-w-xl shadow-lg -shadow--color-black-shadow rounded-lg'>
          <header>
            <h1 className="text-lg font-semibold">{item.informe.tipoInforme}</h1>
            <button
              className="absolute right-4 top-4"
              onClick={() => handleMenuOpen()}
            >
              <img src={close_icon} className="w-5" />
            </button>
          </header>
          <section>
            <header className="font-semibold -text--color-mate-dark-violet">
              Report
            </header>
            <ul className="grid grid-cols-2 py-2">
              <li className=""><span className="mr-2 font-semibold -text--color-mate-dark-violet">ID:</span> {item.informe.id}</li>
              <li className=""><span className="mr-2 font-semibold -text--color-mate-dark-violet">Date:</span> {item.informe.fecha}</li>
              <li className=""><span className="mr-2 font-semibold -text--color-mate-dark-violet">Start time:</span> {item.tiempoInicio}</li>
              <li className=""><span className="mr-2 font-semibold -text--color-mate-dark-violet">End time:</span> {item.tiempoFin}</li>
              <li className=""><span className="mr-2 font-semibold -text--color-mate-dark-violet">Response time:</span> {item.duracionSegundos}</li>
            </ul>
          </section>
        </section>
      </aside>
    </>
  )
}