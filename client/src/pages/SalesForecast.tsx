import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "../hook/useUser"
import { SideNavbar } from "../components/Global/SideNavbar"
import { ReportHeaderTitle } from "../components/Reports/ReportHeaderTitle"
import { getForecastById } from "../utils/Services/forecast.database.service"
import { ForecastOverview } from "../components/Reports/Forecast/ForecastOverview"
import { TopTenForecast } from "../components/Reports/Forecast/ToptenForecast"
import { ReportChat } from "../components/Reports/ChatReports/ChatReport"
import { ReportRating } from "../components/Admin/ReportRating/ReportRating"

export const SalesForecasting = () => {

  const { idBranch } = useParams()
  const { idInforme } = useParams()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser } = useUser()

  const [forecast, setForecast] = useState<Forecast>()
  const [productEstimations, setProductEstimations] = useState<Record<string, ProductForecast[]>>()

  const [overview, setOverview] = useState<boolean>(false);
  const [topten, setTopten] = useState<boolean>(true);
  const [comments, setAssessment] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'InventoMate | Sales Forecasting'
  }, [])

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)

      if (idBranch && idInforme) {
        const response = await getForecastById(accessToken, idBranch, idInforme)
        setForecast(response)
        console.log(response)
        const estimations = response?.estimaciones_por_producto
        if (estimations) {
          setProductEstimations(estimations)
        }
      }

    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  function selectOverview() {
    setOverview(true)
    setTopten(false)
    setAssessment(false)
  }

  function selectTopten() {
    setOverview(false)
    setTopten(true)
    setAssessment(false)
  }

  function selectAssessment() {
    setOverview(false)
    setTopten(false)
    setAssessment(true)
  }


  return (
    <main className="-text--color-black flex mb-4">
      <section className="hidden relative lg:block w-64">
        <SideNavbar />
      </section>
      <section className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
        <header className="p-2 relative">
          <ReportHeaderTitle title="Sales Forecasting" />
          {
            idBranch && idInforme
            &&
            <ReportRating idBranch={idBranch} idReport={idInforme} />
          }
        </header>
        <section className="my-4">
          <header className="my-2 flex border-b-2 -text--color-mate-dark-violet -border--color-mate-dark-violet">
            <h2
              className={`text-lg font-semibold p-4 px-8 hover:cursor-pointer hover:opacity-80 ${topten && "-bg--color-black bg-opacity-10"} `}
              onClick={() => selectTopten()}
            >
              Top Ten
            </h2>
            <h2
              className={`text-lg font-semibold p-4 px-8 hover:cursor-pointer hover:opacity-80 ${overview && "-bg--color-black bg-opacity-10"} `}
              onClick={() => selectOverview()}
            >
              Overview
            </h2>
            <h2
              className={`text-lg font-semibold p-4 px-8 hover:cursor-pointer hover:opacity-80 ${comments && "-bg--color-black bg-opacity-10"} `}
              onClick={() => selectAssessment()}
            >
              Comments
            </h2>
          </header>
          {
            productEstimations
              &&
              overview
              ?
              <ForecastOverview productEstimations={productEstimations} />
              : (
                topten
                  ?
                  (
                    forecast && productEstimations
                    &&
                    <TopTenForecast forecast={forecast} productEstimations={productEstimations} />
                  )
                  :
                  (
                    idBranch && idInforme
                    &&
                    <ReportChat idBranch={idBranch} idInforme={idInforme} />
                  )
              )
          }
        </section>
      </section>
    </main>
  )
}