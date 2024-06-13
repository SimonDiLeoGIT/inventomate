import { useAuth0 } from "@auth0/auth0-react"
import { useUser } from "../hook/useUser"
import { useEffect, useState } from "react"
import { getNewTrends, getTrends } from "../utils/Services/trends.database.service"
import { SideNavbar } from "../components/Global/SideNavbar"
import { EmptyHistory } from "../components/Errors/EmptyHistory"
import { NoDatabaseConnection } from "../components/Errors/NoDatabaseConnection"
import { Reports } from "../components/Reports/Reports"
import { ReportHeader } from "../components/Reports/ReportHeader"
import { SelectBranch } from "../components/Messages/SelectBranch"
import { getDatabaseConnection } from "../utils/Services/database.database.service"

export const TrendsReports = () => {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const { currentUser, setUser } = useUser()

  const [requesting, setRequesting] = useState<boolean>(false)
  const [database, setDatabase] = useState<boolean>(true)
  const [trendReports, setTrendReports] = useState<Report>()
  const [branch, setBranch] = useState<string>('')
  const totalArticles = 10


  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)
    }

    isAuthenticated && getToken()

    if (currentUser?.sucursal?.idSucursal !== undefined)
      setBranch(currentUser?.sucursal?.idSucursal.toString())

  }, [isAuthenticated])

  const getDatabase = async (accessToken: string): Promise<boolean> => {
    const dc = await getDatabaseConnection(accessToken)
    if (dc === null) {
      return false
    } else
      return true
  }

  const handleGetNewTrends = async () => {
    setRequesting(true)
    const accessToken = await getAccessTokenSilently()

    if (await getDatabase(accessToken)) {
      await getNewTrends(accessToken, branch)
    } else {
      setDatabase(false)
    }
    await getReports(branch, 0, 'desc', null, null, null)
    setRequesting(false)
  }

  const getReports = async (idBranch: string, currentPage: number, sortOrder: 'asc' | 'desc', dateFrom: string | null, dateTo: string | null, viewed: boolean | null) => {
    const accessToken = await getAccessTokenSilently()
    const response = await getTrends(accessToken, idBranch, currentPage, totalArticles, sortOrder, dateFrom, dateTo, viewed)
    setTrendReports(response)
  }

  const handleChangeOption = async (idBranch: string) => {
    setBranch(idBranch)
    await getReports(idBranch, 0, 'desc', null, null, null)
  }

  return (
    <main className="-text--color-black flex">
      <section className="hidden relative lg:block w-64">
        <SideNavbar />
      </section>
      <section className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
        <ReportHeader title="New Trends" button_text="Discover New Trends" handleChangeOption={handleChangeOption} buttonEvent={handleGetNewTrends} requesting={requesting} branch={branch} />
        {
          database ? (
            branch === ''
              ?
              <SelectBranch />
              :
              trendReports
                ?
                <Reports reports={trendReports} idBranch={branch} getReport={getReports} />
                :
                <EmptyHistory />
          )
            :
            <NoDatabaseConnection />
        }
      </section>
    </main>
  )
}