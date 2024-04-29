import { useState } from 'react'
import menu from '../assets/icons/menu.svg'
import { MenuOptions } from './MenuOptions'
import '../styles/mobile-menu.css'

export const MobileMenu = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  function handleMenuOpen() {
    setOpen(!open)
    isOpen ? setTimeout(function () {
      setIsOpen(!isOpen);
    }, 200)
      : setIsOpen(!isOpen);
    open ?
      document.body.classList.add('none-scroll')
      :
      document.body.classList.remove('none-scroll')
  }

  return (
    <>
      <button
        className=""
        onClick={() => handleMenuOpen()}
      >
        <img src={menu} className="w-6" />
      </button>

      <aside className={`fixed w-screen h-screen overflow-hidden top-20 left-0 ${!isOpen && 'hidden'} opacity-animation`}>
        <section className={`fixed w-screen h-screen left-0 -bg--color-white ${open ? ' open-mobile-menu' : ' close-mobile-menu'}`}>
          <MenuOptions />
        </section>
      </aside >
    </>
  )
}