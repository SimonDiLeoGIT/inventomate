import { useEffect, useState } from "react";
import { AdminReportsNavbar } from "../../components/Admin/AdminReportsNavbar";
import { useUser } from "../../hook/useUser";
import { useAuth0 } from "@auth0/auth0-react";
import { ReportStatsData } from "../../components/Admin/ReportStats/ReportStatsData";
import { getReportStats, getTimeReports } from "../../utils/Services/Admin/report-stats.service";
import { TimeReport } from "../../components/Admin/ReportStats/TimeReport";

export const ReportStats = () => {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser } = useUser()

  const [reportStats, setReportStats] = useState<ReportStats>()
  const [timeReports, setTimeReports] = useState<TimeReport>()
  const [myAccessToken, setAccesToken] = useState<string>('')

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)
      setAccesToken(accessToken)
      const response = await getReportStats(accessToken)
      setReportStats(response)
      getTimeReportsInfo(accessToken, 0, 10, 'id', 'asc', null, null, null)
    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  const getTimeReportsInfo = async (accessToken: string, currentPage: number, size: number, sort: keyof ReportContent, order: 'asc' | 'desc', reportType: string | null, from: string | null, to: string | null) => {
    const overview = await getTimeReports(accessToken, currentPage, size, sort, order, reportType, from, to)
    setTimeReports(overview)
  }

  return (
    <main className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
      <AdminReportsNavbar />
      <div className="my-4 grid gap-4">
        {reportStats && <ReportStatsData stats={reportStats} />}
        {timeReports && <TimeReport data={timeReports} accessToken={myAccessToken} getTimeReportsInfo={getTimeReportsInfo} />}
      </div>
    </main>
  )
}