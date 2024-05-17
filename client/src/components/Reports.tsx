import { Link } from "react-router-dom"
import '../styles/Reports.css'

interface props {
  reports: Report[]
  idBranch: string
}

export const Reports: React.FC<props> = ({ reports, idBranch }) => {
  return (
    <ul className="rounded-lg overflow-hidden shadow-md -shadow--color-black-shadow">
      <li className="grid grid-cols-2 border-b p-2 -bg--color-mate-dark-violet -text--color-white font-bold">
        <p>ID</p>
        <p>Date</p>
      </li>
      {
        reports.reverse().map((report, index) => {
          return (
            <li className={`grid grid-cols-2 hover:opacity-80 ${(index % 2 === 0) && '-bg--color-border-very-lightest-grey'} relative ${!report.visto && '-bg--color-light-opaque-pink sombreado'}`}>
              <Link
                to={`./${idBranch}/${report.id}`}
                className="block p-2"
              >
                {report.id}
              </Link>
              <Link
                to={`./${idBranch}/${report.id}`}
                className="flex p-2"
              >
                {report.fecha}
                {
                  !report.visto
                  &&
                  <p className="-bg--color-light-opaque-pink inline-block p-1 text-xs -text--color-semidark-violet font-medium rounded-md m-auto mr-0 opacidad">New</p>
                }
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}