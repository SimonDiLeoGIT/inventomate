import React, { useEffect, useState } from "react"
import close_icon from '../../assets/icons/close.svg'

interface props {
  product: ObsoletProductsWithCategory
  index: number
}

export const TableData: React.FC<props> = ({ product, index }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    console.log(index)
  })

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
        className={`grid grid-cols-8 hover:cursor-pointer hover:opacity-80 ${(index % 2 === 0) && '-bg--color-border-very-lightest-grey'}`}
        onClick={handleMenuOpen}
      >
        <p className="p-2">{product.id_producto}</p>
        <p className="p-2 col-span-4">{product.nombre}</p>
        <p className={`p-2 ${product.obsoleto ? '-text--color-ful-red' : '-text--color-green'} font-semibold`}>{product.obsoleto ? 'True' : 'False'}</p>
        <p className={`p-2 col-span-2 ${product.obsoleto ? '-text--color-ful-red' : '-text--color-green'} font-semibold`}>{product.OG}</p>
      </li>

      <aside className={`fixed w-screen h-screen overflow-hidden top-0 left-0 ${!isOpen && 'hidden'} opacity-animation grid place-content-center z-50`}>
        <section className='-bg--color-white p-4 relative w-screen max-w-xl shadow-lg -shadow--color-black-shadow rounded-lg z-50'>
          <header>
            <h3 className="text-lg font-semibold">{product.nombre}</h3>
            <button
              className="absolute right-4 top-4"
              onClick={() => handleMenuOpen()}
            >
              <img src={close_icon} className="w-5" />
            </button>
          </header>
          <ul className="">
            <li className="p-2 grid grid-cols-2 "><span className="mr-2 font-semibold -text--color-mate-dark-violet">Product ID:</span> {product.id_producto}</li>
            <li className={`p-2  grid grid-cols-2 ${product.obsoleto ? '-text--color-ful-red' : '-text--color-green'} font-semibold`}><span className="mr-2 font-semibold -text--color-mate-dark-violet">Obsolet:</span> {product.obsoleto ? 'True' : 'False'}</li>
            <li className={`p-2  grid grid-cols-2 ${product.obsoleto ? '-text--color-ful-red' : '-text--color-green'} font-semibold`}><span className="mr-2 font-semibold -text--color-mate-dark-violet">Degree of Obsolescence: </span>{product.OG}</li>
            <li className="p-2  grid grid-cols-2"><span className="mr-2 font-semibold -text--color-mate-dark-violet">Actual Price:</span> ${product.precio_actual}</li>
            <li className="p-2  grid grid-cols-2"><span className="mr-2 font-semibold -text--color-mate-dark-violet">Sales Last Three Months:</span> {product.ventas_ultimos_3_meses}</li>
          </ul>
          {
            product.obsoleto
            &&
            <section className="my-2">
              <header className="mb-2">
                <h4 className="font-bold -text--color-mate-dark-violet">Suggestions</h4>
              </header>
              <ul className="">
                <li className="p-2  grid grid-cols-2 font-semibold -text--color-green"><span className="mr-2 -text--color-mate-dark-violet">Recommended Promo:</span> -%{product.promo_recomendada}</li>
                <li className="p-2  grid grid-cols-2"><p><span className="mr-2 font-semibold -text--color-mate-dark-violet">Price With Promo:</span></p><p><s className="-bg--color-border-very-lightest-grey bg-opacity-60 -text--color-mate-dark-violet shadow-md p-1 rounded-md">${product.precio_actual}</s> ${product.precio_con_descuento}</p></li>
              </ul>
            </section>
          }
        </section>
      </aside>
    </>
  )
}