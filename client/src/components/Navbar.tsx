import { useAuth0 } from "@auth0/auth0-react"
import logo from "../assets/images/InventoMate-logo.png"
import logout_icon from "../assets/icons/logout-svgrepo-com.svg"
import { Link } from "react-router-dom";

export const Navbar = () => {

  const { user, logout, isAuthenticated } = useAuth0();

  return (
    <nav className="w-full border-b -border--color-border-very-light-grey h-20 -bg--color-white fixed top-0 flex">
      <h1 className='h-full ml-4'>
        <Link to='/' className=" h-full block">
          <img src={logo} alt="InventoMateLogo" className="h-full py-4" />
        </Link>
      </h1>
      {isAuthenticated &&
        <ul className="hidden md:flex items-center w-8/12 m-auto font-medium">
          <li className="mx-4 hover:opacity-60">
            <Link to='/'>Home</Link>
          </li>
          <li className="mx-4 hover:opacity-60">
            <Link to='/company'>Company</Link>
          </li>
        </ul>
      }
      {isAuthenticated &&
        <ul className="flex h-full items-center m-auto mr-0">
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