import { Link } from "react-router-dom"
import decisions from '../assets/icons/decisions.svg'
import obsolesecnce from '../assets/icons/anti-obsolescence.svg'
import trends from '../assets/icons/new-trends.svg'
import orders from '../assets/icons/next-orders.svg'
import forecasting from '../assets/icons/forecasting.svg'
import history from '../assets/icons/history.svg'
import settings from '../assets/icons/settings.svg'
import settings_section from '../assets/icons/settings-section.svg'
import report from '../assets/icons/report.svg'
import { useUser } from "../hook/useUser"

export const SideNavbar = () => {

  const { currentUser } = useUser()

  return (
    <nav className="p-2 text-color-black shadow-lg shadow-color-border-light-grey w-72 fixed top-20 bottom-0">
      <header className="p-1">
        <h2 className="font-semibold text-lg">{currentUser?.empresa?.nombreEmpresa}</h2>
      </header>
      <h3 className="flex items-center font-medium">
        <img src={report} className="w-5 mr-2" />
        Reports
      </h3>
      <ul className="mx-4">
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <Link
            to='/reports/members-decisions'
            className="flex p-2"
          >
            <img src={decisions} alt="Company Settings" className="w-5 mr-2" />
            Members Decisions
          </Link>
        </li>
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <Link to='/reports/anti-obsolescense' className="flex p-2">
            <img src={obsolesecnce} alt="Open Branches" className="w-5 mr-2" />
            Anti-Obsolescence
          </Link>
        </li>
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <Link
            to='/reports/new-trends'
            className="flex p-2"
          >
            <img src={trends} alt="Members" className="w-5 mr-2" />
            New Trends
          </Link>
        </li>
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <Link
            to='/reports/next-orders'
            className="flex p-2"
          >
            <img src={orders} alt="Members" className="w-5 mr-2" />
            Next Orders
          </Link>
        </li>
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <Link
            to='/reports/sales-forecasting'
            className="flex p-2"
          >
            <img src={forecasting} alt="Reports" className="w-5 mr-2" />
            Sales Forecasting
          </Link>
        </li>
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <Link
            to='/reports/sales-history'
            className="flex p-2"
          >
            <img src={history} alt="Reports" className="w-5 mr-2" />
            Sales History
          </Link>
        </li>
      </ul>
      <h3 className="flex items-center font-medium">
        <img src={settings_section} className="w-5 mr-2" />
        Settings
      </h3>
      <ul className="mx-4">
        <li className="mb-1 hover:cursor-pointer hover:-bg--color-light-pink hover:bg-opacity-50 rounded-lg">
          <Link
            to='/company-settings'
            className="flex p-2"
          >
            <img src={settings} alt="Connection Settings" className="w-5 mr-2" />
            Company Settings
          </Link>
        </li>
      </ul>
    </nav>
  )
}