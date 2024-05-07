import { Link, useParams } from "react-router-dom"
import decisions from '../assets/icons/decisions.svg'
import obsolesecnce from '../assets/icons/anti-obsolescence.svg'
import trends from '../assets/icons/new-trends.svg'
import orders from '../assets/icons/next-orders.svg'
import forecasting from '../assets/icons/forecasting.svg'
import history from '../assets/icons/history.svg'
import settings from '../assets/icons/settings.svg'
import settings_section from '../assets/icons/settings-section.svg'
import report from '../assets/icons/report.svg'

export const MenuOptions = () => {

  const { idBranch } = useParams()

  return (
    <section className="p-4 lg:p-2">
      <h3 className="flex items-center font-medium">
        <img src={report} className="w-5 mr-2" />
        Reports
      </h3>
      <ul className="p-2 border-b -border--color-border-light-grey">
        <li className="mb-1 hover:cursor-pointer hover:opacity-60 rounded-lg">
          <Link
            to='/company/reports/members-decisions'
            className="flex px-1 py-2"
          >
            <img src={decisions} alt="Company Settings" className="w-5 mr-2" />
            Members Decisions
          </Link>
        </li>
        <li className="mb-1 hover:cursor-pointer hover:opacity-60 rounded-lg">
          <Link
            to={`/company/reports/anti-obsolescense`}
            className="flex px-1 py-2"
          >
            <img src={obsolesecnce} alt="Open Branches" className="w-5 mr-2" />
            Anti-Obsolescence
          </Link>
        </li>
        <li className="mb-1 hover:cursor-pointer hover:opacity-60 rounded-lg">
          <Link
            to={`/company/reports/new-trends/`}
            className="flex px-1 py-2"
          >
            <img src={trends} alt="Members" className="w-5 mr-2" />
            New Trends
          </Link>
        </li>
        <li className="mb-1 hover:cursor-pointer hover:opacity-60 rounded-lg">
          <Link
            to='/company/reports/next-orders'
            className="flex px-1 py-2"
          >
            <img src={orders} alt="Members" className="w-5 mr-2" />
            Next Orders
          </Link>
        </li>
        <li className="mb-1 hover:cursor-pointer hover:opacity-60 rounded-lg">
          <Link
            to='/company/reports/sales-forecasting'
            className="flex px-1 py-2"
          >
            <img src={forecasting} alt="Reports" className="w-5 mr-2" />
            Sales Forecasting
          </Link>
        </li>
        <li className="mb-1 hover:cursor-pointer hover:opacity-60 rounded-lg">
          <Link
            to='/company/reports/sales-history'
            className="flex px-1 py-2"
          >
            <img src={history} alt="Reports" className="w-5 mr-2" />
            Sales History
          </Link>
        </li>
      </ul>
      <h3 className="flex items-center font-medium mt-4">
        <img src={settings_section} className="w-5 mr-2" />
        Settings
      </h3>
      <ul className="p-2 border-b -border--color-border-light-grey">
        <li className="mb-1 hover:cursor-pointer hover:opacity-60 rounded-lg">
          <Link
            to='/company-settings'
            className="flex px-1 py-2"
          >
            <img src={settings} alt="Connection Settings" className="w-5 mr-2" />
            Company Settings
          </Link>
        </li>
      </ul>
    </section>
  )
}