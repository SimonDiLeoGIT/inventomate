import { useAuth0 } from "@auth0/auth0-react"
import { useUser } from "../hook/useUser"
import { useEffect, useState } from "react"
import { getDatabaseConnection, getNewTrends, getTrends } from "../utils/Database.service"
import { SideNavbar } from "../components/SideNavbar"
import { Requesting } from "../components/Requesting"
import { EmptyHistory } from "../components/Errors/EmptyHistory"
import { NoDatabaseConnection } from "../components/Errors/NoDatabaseConnection"
import { TrendReports } from "../components/TrendReports"
import { ReportHeader } from "../components/ReportHeader"

export const Trends = () => {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const { currentUser, setUser } = useUser()

  const [requesting, setRequesting] = useState<boolean>(false)
  const [database, setDatabase] = useState<boolean>(true)
  const [trendReports, setTrendReports] = useState<TrendReport[] | null>(null)
  const [branch, setBranch] = useState<string>('')

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
    setRequesting(false)
  }

  const handleChangeOption = async (idBranch: string) => {
    setBranch(idBranch)
    console.log('branch: ', branch)
    const accessToken = await getAccessTokenSilently()
    const response = await getTrends(accessToken, idBranch)
    setTrendReports(response)
    console.log('trends: ', response)
  }

  return (
    <main className="-text--color-black flex">
      <section className="hidden relative lg:block w-64">
        <SideNavbar />
      </section>
      <section className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
        <ReportHeader title="New Trends" button_text="Discover New Trends" handleChangeOption={handleChangeOption} buttonEvent={handleGetNewTrends} />
        {requesting ?
          <Requesting />
          :
          database ? (
            ((trendReports !== null) ?
              <TrendReports trendReports={trendReports} idBranch={branch} />
              :
              <EmptyHistory />
            ))
            :
            <NoDatabaseConnection />
        }
      </section>
    </main>
  )
}