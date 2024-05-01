import { useState } from 'react'
import { MenuOptions } from './MenuOptions'
import '../styles/mobile-menu.css'
import { useUser } from '../hook/useUser'
import { useAuth0 } from '@auth0/auth0-react'
import { Link, useNavigate } from 'react-router-dom'
import home_icon from '../assets/icons/home.svg'
import logout_icon from '../assets/icons/log-out-outline.svg'
import settings_icon from '../assets/icons/settings-section.svg'
import profile_icon from '../assets/icons/profile.svg'

export const UserSettings = () => {

  const { logout } = useAuth0();
  const navigate = useNavigate()
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

  const logOut = () => {
    logout({
      openUrl() {
        window.location.origin;
      }
    })
    navigate('/')
  }

  return (
    <>
      <button
        className="h-full mx-4"
        onClick={() => handleMenuOpen()}
      >
        <img className='rounded-full w-7' src={currentUser?.usuario.picture} alt={currentUser?.usuario.nickname} />
      </button>

      <aside className={`fixed w-screen h-screen overflow-hidden top-20 left-0 ${!isOpen && 'hidden'} opacity-animation`}>
        <section
          className={`fixed w-screen h-screen top-20 left-0 -bg--color-white z-10 ${open ? ' open-mobile-menu' : ' close-mobile-menu'} overflow-hidden max-w-96 md:left-auto`}
          onClick={() => handleMenuOpen()}
        >
          <ul className="font-medium border-b -border--color-border-light-grey w-11/12 m-auto">
            <li className="hover:opacity-60">
              <Link to='/profile' className='p-2 flex'><img src={profile_icon} className='w-5 mr-2' />Profile</Link>
            </li>
            <li className="hover:opacity-60">
              <Link to='/profile' className='p-2 flex'><img src={settings_icon} className='w-5 mr-2' />Settings</Link>
            </li>
            <li className="hover:opacity-60">
              <button onClick={() => logOut()} className='p-2 flex'><img src={logout_icon} className='w-5 mr-2' />Logout</button>
            </li>
          </ul>
        </section>
      </aside >
    </>
  )
}