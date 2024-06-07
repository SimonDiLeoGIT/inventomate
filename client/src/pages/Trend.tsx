import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "../hook/useUser"
import { getTrendById } from "../utils/Services/trends.database.service"
import { SideNavbar } from "../components/Global/SideNavbar"
import { useTrends } from "../hook/useTrends"
import { ReportHeaderTitle } from "../components/Reports/ReportHeaderTitle"
import { Products } from "../components/Reports/Trends/Products"
import { MakeDecision } from "../components/Reports/Decisions/MakeDecision"

export const Trend = () => {

  const { idBranch } = useParams()
  const { idInforme } = useParams()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser } = useUser()
  const { trends, setTrends } = useTrends()


  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)

      if (idBranch && idInforme) {
        const response = await getTrendById(accessToken, idBranch, idInforme)
        setTrends(response)
      }

    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  return (
    <main className="-text--color-black flex">
      <section className="hidden relative lg:block w-64">
        <SideNavbar />
      </section>
      <section className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
        <header className="p-2">
          <ReportHeaderTitle title="New Trends" />
        </header>
        {
          trends?.trends.map((trend) => {
            return (
              <section className="p-2">
                <header className="mb-2">
                  <h2 className="font-semibold text-lg py-2">{trend.category_name}</h2>
                </header>
                <Products trend={trend} />
              </section>
            )
          })
        }
        <div className="my-4">
          {
            idInforme && idBranch &&
            <MakeDecision idReport={idInforme} idBranch={idBranch} />
          }
        </div>
      </section>
    </main>
  )
}