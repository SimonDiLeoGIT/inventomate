import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "../hook/useUser"
import { SideNavbar } from "../components/SideNavbar"
import { ReportHeaderTitle } from "../components/ReportHeaderTitle"
import { ChartComponent } from "../components/ChartComponent"
import data from '../assets/temp/foreasting.json'

export const SalesForecasting = () => {

  const { idBranch } = useParams()
  const { idInforme } = useParams()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser } = useUser()


  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)

      // if (idBranch && idInforme) {
      //   const response = await getTrendById(accessToken, idBranch, idInforme)
      //   setTrends(response)
      // }

    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  return (
    <main className="-text--color-black flex mb-4">
      <section className="hidden relative lg:block w-64">
        <SideNavbar />
      </section>
      <section className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
        <header className="">
          <ReportHeaderTitle title="Sales Forecasting" />
        </header>
        <section className="my-4">
          <h2 className="font-semibold -text--color-violet-user-email">Sales forecasting for the next month</h2>
          <ChartComponent forecast={data} />
        </section>
        <div className="w-full grid grid-cols-2 gap-4 p-2 -bg--color-border-very-lightest-grey rounded-lg shadow-md -shadow--color-black-shadow">
          <p className="font-semibold">Total Profit</p>
          <p>{data.ganancia_estimada}</p>
        </div>
      </section>
    </main>
  )
}