import { useAuth0 } from "@auth0/auth0-react"
import { useUser } from "../hook/useUser"
import { useEffect, useState } from "react"
import { SideNavbar } from "../components/SideNavbar"
import { EmptyHistory } from "../components/Errors/EmptyHistory"
import { NoDatabaseConnection } from "../components/Errors/NoDatabaseConnection"
import { Reports } from "../components/Reports"
import { ReportHeader } from "../components/ReportHeader"
import { SelectBranch } from "../components/Messages/SelectBranch"
import { getDatabaseConnection } from "../utils/Services/database.database.service"
import { getNewObsoletProducts, getObsoletProductsReports } from "../utils/Services/obsolescence.database.service"

export const ObsolescenceReports = () => {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const { currentUser, setUser } = useUser()

  const [requesting, setRequesting] = useState<boolean>(false)
  const [database, setDatabase] = useState<boolean>(true)
  const [obsolescenceReports, setObsolescenceReport] = useState<Report[]>([])
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

  const handleGetNewReport = async () => {
    setRequesting(true)
    const accessToken = await getAccessTokenSilently()

    if (await getDatabase(accessToken)) {
      try {
        await getNewObsoletProducts(accessToken, branch)
      } catch (e: any) {

      }
    } else {
      setDatabase(false)
    }
    await getReports(branch)
    setRequesting(false)
  }

  const getReports = async (idBranch: string) => {
    const accessToken = await getAccessTokenSilently()
    const response = await getObsoletProductsReports(accessToken, idBranch)
    response && setObsolescenceReport(response)
  }

  const handleChangeOption = async (idBranch: string) => {
    setBranch(idBranch)
    getReports(idBranch)
  }

  return (
    <main className="-text--color-black flex">
      <section className="hidden relative lg:block w-64">
        <SideNavbar />
      </section>
      <section className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
        <ReportHeader title="Obsolescence" button_text="Anti-Obsolescence Suggestion" handleChangeOption={handleChangeOption} buttonEvent={handleGetNewReport} requesting={requesting} branch={branch} />
        {
          database ? (
            branch === ''
              ?
              <SelectBranch />
              :
              ((obsolescenceReports !== null && obsolescenceReports.length > 0) ?
                <Reports reports={obsolescenceReports} idBranch={branch} />
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