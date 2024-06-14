import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "../hook/useUser"
import { getTrendById } from "../utils/Services/trends.database.service"
import { SideNavbar } from "../components/Global/SideNavbar"
import { useTrends } from "../hook/useTrends"
import { ReportHeaderTitle } from "../components/Reports/ReportHeaderTitle"
import { Products } from "../components/Reports/Trends/Products"
import { Justification } from "../components/Reports/Justification"
import { ReportRating } from "../components/Admin/ReportRating/ReportRating"
import { ReportChat } from "../components/Reports/ChatReports/ChatReport"

export const Trend = () => {

  const { idBranch } = useParams()
  const { idInforme } = useParams()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser } = useUser()
  const { trends, setTrends } = useTrends()

  const [reportSection, setReportSection] = useState<boolean>(true)
  const [comments, setRatingSection] = useState<boolean>(false)

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

  function changeSection() {
    setRatingSection(!comments)
    setReportSection(!reportSection)
  }

  return (
    <main className="-text--color-black flex">
      <section className="hidden relative lg:block w-64">
        <SideNavbar />
      </section>
      <section className={`m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12`}>
        <header className="p-2 relative">
          <ReportHeaderTitle title="New Trends" />
          {
            idBranch && idInforme
            &&
            <ReportRating idBranch={idBranch} idReport={idInforme} />
          }
        </header>
        <header className="my-2 flex border-b-2 -text--color-mate-dark-violet -border--color-mate-dark-violet">
          <h2
            className={`text-lg font-semibold p-4 px-8 hover:cursor-pointer hover:opacity-80 ${reportSection && "-bg--color-black bg-opacity-10"} `}
            onClick={() => changeSection()}
          >
            New Trends
          </h2>
          <h2
            className={`text-lg font-semibold p-4 px-8 hover:cursor-pointer hover:opacity-80 ${comments && "-bg--color-black bg-opacity-10"} `}
            onClick={() => changeSection()}
          >
            Comments
          </h2>
        </header>
        {
          reportSection
            ?
            (
              trends
              &&
              <section>
                <Justification justificacion={trends?.justificacion} />
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
              </section>
            )
            :
            idBranch && idInforme
            &&
            <ReportChat idBranch={idBranch} idInforme={idInforme} />
        }
      </section>
    </main>
  )
}