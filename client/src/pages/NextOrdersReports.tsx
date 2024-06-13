import { useAuth0 } from "@auth0/auth0-react"
import { useUser } from "../hook/useUser"
import { useEffect, useState } from "react"
import { SideNavbar } from "../components/Global/SideNavbar"
import { EmptyHistory } from "../components/Errors/EmptyHistory"
import { NoDatabaseConnection } from "../components/Errors/NoDatabaseConnection"
import { Reports } from "../components/Reports/Reports"
import { ReportHeader } from "../components/Reports/ReportHeader"
import { SelectBranch } from "../components/Messages/SelectBranch"
import { existsDatabaseConnection } from "../utils/Services/database.database.service"
import { getNewNextOrders, getNextOrders } from "../utils/Services/nextOrders.database.service"

export const NextOrdersReports = () => {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const { currentUser, setUser } = useUser()

  const [requesting, setRequesting] = useState<boolean>(false)
  const [database, setDatabase] = useState<boolean>(true)
  const [nextOrdersReports, setNextOrdersReport] = useState<Report>()
  const [branch, setBranch] = useState<string>('')
  const totalArticles = 10

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)
    }

    isAuthenticated && getToken()

    if (currentUser?.sucursal?.idSucursal !== undefined) {
      setBranch(currentUser?.sucursal?.idSucursal.toString())
      handleChangeOption(currentUser?.sucursal?.idSucursal.toString())
    }
  }, [isAuthenticated])

  const handleGetNewReport = async () => {
    setRequesting(true)
    const accessToken = await getAccessTokenSilently()

    if (await existsDatabaseConnection(accessToken)) {
      try {
        await getNewNextOrders(accessToken, branch)
      } catch (e: any) {

      }
    } else {
      setDatabase(false)
    }
    await getReports(branch, 0, 'desc', null, null, null)
    setRequesting(false)
  }

  const getReports = async (idBranch: string, currentPage: number, sortOrder: 'asc' | 'desc', dateFrom: string | null, dateTo: string | null, viewed: boolean | null) => {
    const accessToken = await getAccessTokenSilently()
    const response = await getNextOrders(accessToken, idBranch, currentPage, totalArticles, sortOrder, dateFrom, dateTo, viewed)
    response && setNextOrdersReport(response)
    console.log(response)
  }

  const handleChangeOption = async (idBranch: string) => {
    setBranch(idBranch)
    getReports(branch, 0, 'desc', null, null, null)
  }

  return (
    <main className="-text--color-black flex">
      <section className="hidden relative lg:block w-64">
        <SideNavbar />
      </section>
      <section className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
        <ReportHeader title="Next Orders" button_text="Suggestion For Next Orders" handleChangeOption={handleChangeOption} buttonEvent={handleGetNewReport} requesting={requesting} branch={branch} />
        {
          database ? (
            branch === ''
              ?
              <SelectBranch />
              :
              nextOrdersReports
                ?
                <Reports reports={nextOrdersReports} idBranch={branch} getReport={getReports} />
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