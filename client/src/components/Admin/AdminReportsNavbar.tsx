import { Link } from "react-router-dom"
import logo from "../../assets/images/InventoMate-logo.png"

export const AdminReportsNavbar = () => {

  const url = '/system/reports/'

  return (
    <nav className="w-screen border-b -border--color-border-very-light-grey h-20 -bg--color-white fixed top-0 left-0 flex items-center z-50">
      <h1 className='h-full m-auto lg:ml-4'>
        <Link to='/' className=" h-full block">
          <img src={logo} alt="InventoMateLogo" className="h-full py-4" />
        </Link>
      </h1>
      <ul className="hidden lg:flex items-center w-8/12 xl:w-10/12 m-auto font-medium">
        <li className="mx-4 hover:opacity-60">
          <Link to={`${url}rating`} className=" h-full block">
            Rating
          </Link>
        </li>
        <li className="mx-4 hover:opacity-60">
          <Link to={`${url}stats`}>Reports Stats</Link>
        </li>
        <li className="mx-4 hover:opacity-60">
          <Link to={`${url}errors`}>Errors</Link>
        </li>
      </ul>
    </nav>
  )
}