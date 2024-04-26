import { Link } from "react-router-dom"
import company_icon from '../assets/icons/company-cooperation-organize-svgrepo-com.svg'
import open_arrow_icon from '../assets/icons/arrow-down-svgrepo-com.svg'
import members_icon from '../assets/icons/users-2-svgrepo-com.svg'
import reports_icon from '../assets/icons/report-barchart-svgrepo-com.svg'
import connection_settings_icon from '../assets/icons/database-svgrepo-com.svg'

export const SideNavbar = () => {


  return (
    <nav className="p-2 text-color-black shadow-lg shadow-color-border-light-grey w-72 resize-x overflow-auto">
      <header className="p-1">
        <h2 className="font-bold">Company Name</h2>
      </header>
      <h3>Reports</h3>
      <ul className="mx-4">
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <Link
            to='/reports/members-decisions'
            className="flex p-2"
          >
            <img src={company_icon} alt="Company Settings" className="w-6 mr-2" />
            Members Decision
          </Link>
        </li>
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <Link to='/reports/anti-obsolescense' className="flex p-2">
            <img src={open_arrow_icon} alt="Open Branches" className="w-6 mr-2" />
            Anti-Obsolescence
          </Link>
        </li>
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <Link
            to='/reports/new-trends'
            className="flex p-2"
          >
            <img src={members_icon} alt="Members" className="w-6 mr-2" />
            New Trends
          </Link>
        </li>
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <Link
            to='/reports/next-orders'
            className="flex p-2"
          >
            <img src={members_icon} alt="Members" className="w-6 mr-2" />
            Next Orders
          </Link>
        </li>
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <Link
            to='/reports/sales-forecasting'
            className="flex p-2"
          >
            <img src={reports_icon} alt="Reports" className="w-6 mr-2" />
            Sales Forecasting
          </Link>
        </li>
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <Link
            to='/reports/sales-history'
            className="flex p-2"
          >
            <img src={reports_icon} alt="Reports" className="w-6 mr-2" />
            Sales History
          </Link>
        </li>
      </ul>
      <h3>Settings</h3>
      <ul className="mx-4">
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <Link
            to='/company-settings'
            className="flex p-2"
          >
            <img src={connection_settings_icon} alt="Connection Settings" className="w-6 mr-2" />
            Company Settings
          </Link>
        </li>
      </ul>
    </nav>
  )
}