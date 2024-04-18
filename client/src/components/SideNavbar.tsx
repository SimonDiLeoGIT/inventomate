import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'
import company_icon from '../assets/icons/company-cooperation-organize-svgrepo-com.svg'
import open_arrow_icon from '../assets/icons/arrow-down-svgrepo-com.svg'
import add_icon from '../assets/icons/add-plus-circle-svgrepo-com.svg'
import members_icon from '../assets/icons/users-2-svgrepo-com.svg'
import reports_icon from '../assets/icons/report-barchart-svgrepo-com.svg'
import connection_settings_icon from '../assets/icons/database-svgrepo-com.svg'

export const SideNavbar = () => {


  return (
    <nav className="p-2 text-color-black shadow-lg shadow-color-border-light-grey w-72 fixed top-20 bottom-0">
      <header className="p-1">
        <h2 className="font-bold">Company Name</h2>
      </header>
      <ul>
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <Link
            to='/group'
            className="flex p-2"
          >
            <img src={company_icon} alt="Company Settings" className="w-6 mr-2" />
            Company Settings
          </Link>
        </li>
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <button className="flex p-2">
            <img src={open_arrow_icon} alt="Open Branches" className="w-6 mr-2" />
            Branches
          </button>
          {/* <ul>
            <li>
              <button>Register Branch</button>
            </li>
          </ul> */}
        </li>
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <Link
            to='/group'
            className="flex p-2"
          >
            <img src={members_icon} alt="Members" className="w-6 mr-2" />
            Members
          </Link>
        </li>
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <Link
            to='/group'
            className="flex p-2"
          >
            <img src={reports_icon} alt="Reports" className="w-6 mr-2" />
            Reports
          </Link>
        </li>
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <Link
            to='/group'
            className="flex p-2"
          >
            <img src={connection_settings_icon} alt="Connection Settings" className="w-6 mr-2" />
            Connection Settings
          </Link>
        </li>
      </ul>
    </nav>
  )
}