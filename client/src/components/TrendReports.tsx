import { Link } from "react-router-dom"

interface props {
  trendReports: TrendReport[]
  idBranch: string
}

export const TrendReports: React.FC<props> = ({ trendReports, idBranch }) => {
  return (
    <ul>
      <li className="grid grid-cols-2">
        <p>ID</p>
        <p>Date</p>
      </li>
      {
        trendReports.map(trendReport => {
          return (
            <li className="grid grid-cols-2">
              <Link to={`./${idBranch}/${trendReport.id}`}>
                {trendReport.id}
              </Link>
              <Link to={`./${idBranch}/${trendReport.id}`}>
                {trendReport.fecha}
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}