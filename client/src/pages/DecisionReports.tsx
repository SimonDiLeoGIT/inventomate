import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "../hook/useUser"
import { SideNavbar } from "../components/Global/SideNavbar"
import { ReportHeaderTitle } from "../components/Reports/ReportHeaderTitle"
import { getDecisionReports } from "../utils/Services/decision.database.service"
import { SelectBranch } from "../components/Messages/SelectBranch"
import { EmptyHistory } from "../components/Errors/EmptyHistory"
import { NoDatabaseConnection } from "../components/Errors/NoDatabaseConnection"
import { getDatabaseConnection } from "../utils/Services/database.database.service"
import { getCompany } from "../utils/Services/company.database.service"
import { ReportsForDecisions } from "../components/Reports/Decisions/ReportsForDecisions"

export const DecisionReports = () => {

  const { idBranch } = useParams()
  const { idInforme } = useParams()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser, currentUser } = useUser()

  const [decisionReports, setDecisionReports] = useState<Report[]>([])
  const [database, setDatabase] = useState<boolean>(true)
  const [branch, setBranch] = useState<string>('')
  const [company, setCompany] = useState<Company | null>(null)


  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)

      if (idBranch && idInforme) {
        const response = await getDecisionReports(accessToken, idBranch)
        response && setDecisionReports(response)
        console.log(response)
      }

    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()

      const userCompany = await getCompany(accessToken)
      setCompany(userCompany)

    }

    isAuthenticated && getToken()

  }, [isAuthenticated])


  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()

      const dc = await getDatabaseConnection(accessToken)
      if (dc === null) {
        setDatabase(false)
      } else
        setDatabase(true)
    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  const getReports = async (idBranch: string) => {
    const accessToken = await getAccessTokenSilently()
    const response = await getDecisionReports(accessToken, idBranch)
    response && setDecisionReports(response)
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
        <header className="py-2">
          <ReportHeaderTitle title="Decisions" />
          <div className="mt-4 grid gap-2">
            {currentUser?.roles.some(role => role.idRol === 1)
              &&
              <select
                className="w-full -bg--color-border-very-lightest-grey p-2 hover:cursor-pointer"
                onChange={(e) => handleChangeOption(e.target.value)}
                id="select_branch"
              >
                <option value="" className="-bg--color-white hover:cursor-pointer">Select Branch</option>
                {
                  company?.sucursales.map(sucursal => {
                    return (
                      <option value={sucursal.idSucursal} className="-bg--color-white hover:cursor-pointer">{sucursal.nombre}</option>
                    )
                  })
                }
              </select>
            }

          </div>
        </header>
        {
          database ? (
            branch === ''
              ?
              <SelectBranch />
              :
              ((decisionReports !== null && decisionReports.length > 0) ?
                <ReportsForDecisions reports={decisionReports} idBranch={branch} />
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