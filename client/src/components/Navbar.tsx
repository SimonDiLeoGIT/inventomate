import { useAuth0 } from "@auth0/auth0-react"
import logo from "../assets/icons/InventoMateLogo.png"
import logout_icon from "../assets/icons/logout-svgrepo-com.svg"

export const Navbar = () => {

  const { user, logout } = useAuth0();

  return (
    <nav className="w-full border-b border-color-border-light-grey h-20 flex shadow-md fixed top-0">
      <h1 className='font-bold ml-4 h-full flex items-center py-2'>
        <img src={logo} alt="InventoMateLogo" className="h-full" />
        <p>InventoMate</p>
      </h1>
      <ul className="w-full flex h-full items-center">
        <li>
        </li>
        <li className="m-auto mr-4">
          <button
            className='rounded-lg hover:bg-color-light-red hover:bg-opacity-20 flex'
            onClick={() => logout({
              openUrl() {
                window.location.origin;
              }
            })}>
            <img src={logout_icon} alt="logout" className="w-10 p-2" />
          </button>
        </li>
        <li className="m-auto mr-4 ml-0">
          <img className='rounded-full w-8' src={user?.picture} alt={user?.name} />
        </li>
      </ul>
    </nav>
  )
}