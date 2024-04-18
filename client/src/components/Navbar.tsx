import { useAuth0 } from "@auth0/auth0-react"
import logo from "../assets/images/InventoMate-logo.png"
import logout_icon from "../assets/icons/logout-svgrepo-com.svg"
import { Link } from "react-router-dom";

export const Navbar = () => {

  const { user, logout, isAuthenticated } = useAuth0();

  return (
    <nav className="w-full border-b -border--color-border-very-light-grey grid grid-cols-9 h-20 -bg--color-white fixed top-0 ">
      <h1 className='font-semibold ml-4 h-20 inline-block py-2'>
        <Link to='/' className=" h-full flex items-center">
          <img src={logo} alt="InventoMateLogo" className="h-full p-2" />
          InventoMate
        </Link>
      </h1>
      <ul className="flex items-center px-4 space-x-4 col-span-7">
        <li className="">
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/company'>Company</Link>
        </li>
      </ul>
      {isAuthenticated &&
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
      }
    </nav>
  )
}