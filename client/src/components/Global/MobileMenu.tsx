import { useState } from 'react'
import menu from '../assets/icons/menu.svg'
import close from '../assets/icons/close.svg'
import { MenuOptions } from './MenuOptions'
import '../styles/mobile-menu.css'
import { useUser } from '../../hook/useUser'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import home_icon from '../assets/icons/home.svg'
import company_icon from '../assets/icons/company.svg'

export const MobileMenu = () => {

  const { isAuthenticated } = useAuth0();
  const { currentUser } = useUser()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  function handleMenuOpen() {
    !open ?
      document.body.classList.add('none-scroll')
      :
      document.body.classList.remove('none-scroll')
    setOpen(!open)
    isOpen ? setTimeout(function () {
      setIsOpen(!isOpen);
    }, 200)
      : setIsOpen(!isOpen);
  }

  return (
    <>
      <button
        className="h-full mx-4 lg:hidden"
        onClick={() => handleMenuOpen()}
      >
        <img src={isOpen ? close : menu} className="w-6" />
      </button>

      <aside className={`fixed w-screen h-screen overflow-hidden top-20 left-0 ${!isOpen && 'hidden'} opacity-animation lg:hidden`}>
        <section
          className={`fixed w-screen h-screen top-20 left-0 -bg--color-white z-10 ${open ? ' open-mobile-menu' : ' close-mobile-menu'} overflow-hidden max-w-96 md:left-auto`}
          onClick={() => handleMenuOpen()}
        >
          <ul className="font-medium border-b -border--color-border-light-grey w-11/12 m-auto">
            <li className="hover:opacity-60">
              <Link to='/' className='p-2 flex'><img src={home_icon} className='w-5 mr-2' />Home</Link>
            </li>
            {isAuthenticated &&
              currentUser?.empresa !== null && (
                <li className="hover:opacity-60">
                  <Link to={currentUser?.roles.some(rol => rol.idRol === 1) ? '/company' : `/company/branch/${currentUser?.sucursal?.idSucursal}`} className='p-2 flex'><img src={company_icon} className='w-5 mr-2' />Company</Link>
                </li>
              )

            }
          </ul>
          <MenuOptions />
        </section>
      </aside >
    </>
  )
}