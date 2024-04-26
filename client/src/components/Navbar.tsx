import { useAuth0 } from "@auth0/auth0-react"
import logo from "../assets/images/InventoMate-logo.png"
import logout_icon from "../assets/icons/log-out-outline.svg"
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hook/useUser";
import { useEffect } from "react";

export const Navbar = () => {

  const { user, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate()
  const { currentUser, setUser } = useUser()

  const logOut = () => {
    navigate('/')
    logout({
      openUrl() {
        window.location.origin;
      }
    })
  }


  return (
    <nav className="w-full border-b -border--color-border-very-light-grey h-20 -bg--color-white fixed top-0 flex">
      <h1 className='h-full ml-4'>
        <Link to='/' className=" h-full block">
          <img src={logo} alt="InventoMateLogo" className="h-full py-4" />
        </Link>
      </h1>
      {isAuthenticated &&
        <ul className="hidden md:flex items-center md:w-8/12 xl:w-10/12 m-auto font-medium">
          <li className="mx-4 hover:opacity-60">
            <Link to='/'>Home</Link>
          </li>
          {currentUser?.empresa !== null && (
            <li className="mx-4 hover:opacity-60">
              <Link to='/company'>Company</Link>
            </li>
          )
          }
        </ul>
      }
      {isAuthenticated &&
        <ul className="flex h-full items-center m-auto mr-0">
          <li>
          </li>
          <li className="m-auto mr-4">
            <button
              className='rounded-lg hover:bg-color-light-red hover:bg-opacity-20 flex'
              onClick={() => logOut()}>
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