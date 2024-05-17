import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "../hook/useUser"
import { SideNavbar } from "../components/SideNavbar"
import { ReportHeaderTitle } from "../components/ReportHeaderTitle"
import { ChartComponent } from "../components/ChartComponent"
import { getForecastById } from "../utils/Database.service"

export const SalesForecasting = () => {

  const { idBranch } = useParams()
  const { idInforme } = useParams()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser } = useUser()

  const [forecast, setForecast] = useState<Forecast | null>()


  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)

      if (idBranch && idInforme) {
        const response = await getForecastById(accessToken, idBranch, idInforme)
        setForecast(response)
        console.log(response)
      }

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
          {forecast &&
            <ChartComponent forecast={forecast} />
          }
        </section>
        <div className="w-full grid grid-cols-2 gap-4 p-2 -bg--color-border-very-lightest-grey rounded-lg shadow-md -shadow--color-black-shadow">
          <p className="font-semibold">Total Profit</p>
          <p>{forecast?.ganancia_estimada}</p>
        </div>
      </section>
    </main>
  )
}