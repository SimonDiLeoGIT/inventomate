import '../../../styles/Reports.css'
import { ReportWithType } from './ReportWithType'

interface props {
  reports: Report[]
  idBranch: string
}

export const ReportsForDecisions: React.FC<props> = ({ reports, idBranch }) => {

  return (
    <ul className="rounded-lg overflow-hidden shadow-md -shadow--color-black-shadow">
      <li className="grid grid-cols-3 border-b p-2 -bg--color-mate-dark-violet -text--color-white font-bold">
        <p>ID</p>
        <p>Type</p>
        <p>Date</p>
      </li>
      {
        reports.reverse().map((report, index) => {
          return (
            <ReportWithType report={report} idBranch={idBranch} index={index} />
          )
        })
      }
    </ul>
  )
}