import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "../hook/useUser"
import { SideNavbar } from "../components/Global/SideNavbar"
import { ReportHeaderTitle } from "../components/Reports/ReportHeaderTitle"
import { getNextOrderById } from "../utils/Services/nextOrders.database.service"
import { TopTen } from "../components/Reports/NextOrders/TopTen"
import { Overview } from "../components/Reports/NextOrders/Overview"
import { ReportRating } from "../components/Reports/ChatReports/ChatReport"

export const NextOrders = () => {

  const { idBranch } = useParams()
  const { idInforme } = useParams()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser } = useUser()

  const [nextOrders, setNextOrders] = useState<NextOrders>()

  const [overview, setOverview] = useState<boolean>(false);
  const [urgently, setUrgently] = useState<boolean>(true);
  const [comments, setAssessment] = useState<boolean>(false);

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)

      if (idBranch && idInforme) {
        const response = await getNextOrderById(accessToken, idBranch, idInforme)
        setNextOrders(response)
      }

    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  function selectOverview() {
    setOverview(true)
    setUrgently(false)
    setAssessment(false)
  }

  function selectUrgently() {
    setOverview(false)
    setUrgently(true)
    setAssessment(false)
  }

  function selectAssessment() {
    setOverview(false)
    setUrgently(false)
    setAssessment(true)
  }


  return (
    <main className="-text--color-black flex">
      <section className="hidden relative lg:block w-64">
        <SideNavbar />
      </section>
      <section className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
        <header className="p-2">
          <ReportHeaderTitle title="Next Orders" />
        </header>
        <section>
          <header className="my-2 flex border-b-2 -text--color-mate-dark-violet -border--color-mate-dark-violet">
            <h2
              className={`text-lg font-semibold p-4 px-8 hover:cursor-pointer hover:opacity-80 ${urgently && "-bg--color-black bg-opacity-10"} `}
              onClick={() => selectUrgently()}
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
            nextOrders && idBranch && idInforme &&
            (
              urgently
                ?
                <TopTen nextOrders={nextOrders} />
                :
                (
                  overview
                    ?
                    <Overview nextOrders={nextOrders} />
                    :
                    <ReportRating idBranch={idBranch} idInforme={idInforme} />
                )
            )
          }
        </section>
      </section>
    </main>
  )
}