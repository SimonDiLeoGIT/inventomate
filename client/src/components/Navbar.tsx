import { useAuth0 } from "@auth0/auth0-react"
import logo from "../assets/images/InventoMate-logo.png"
import logout_icon from "../assets/icons/log-out-outline.svg"
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hook/useUser";
import { MobileMenu } from "./MobileMenu";
import { UserSettings } from "./UserSettings";

export const Navbar = () => {

  const { user, logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate()
  const { currentUser } = useUser()




  return (
    <nav className="w-full border-b -border--color-border-very-light-grey h-20 -bg--color-white fixed top-0 flex items-center z-50">
      <MobileMenu />
      <h1 className='h-full m-auto lg:ml-4'>
        <Link to='/' className=" h-full block">
          <img src={logo} alt="InventoMateLogo" className="h-full py-4" />
        </Link>
      </h1>
      <ul className="hidden lg:flex items-center w-8/12 xl:w-10/12 m-auto font-medium">
        <li className="mx-4 hover:opacity-60">
          <Link to='/'>Home</Link>
        </li>
        {isAuthenticated &&
          currentUser?.empresa !== null && (
            <li className="mx-4 hover:opacity-60">
              <Link to='/company'>Company</Link>
            </li>
          )

        }
      </ul>
      {isAuthenticated &&
        <UserSettings />
      }
    </nav>
  )
}