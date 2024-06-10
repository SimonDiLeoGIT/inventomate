import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "../hook/useUser"
import { SideNavbar } from "../components/Global/SideNavbar"
import { ReportHeaderTitle } from "../components/Reports/ReportHeaderTitle"
import { getNextOrderById } from "../utils/Services/nextOrders.database.service"
import { MakeDecision } from "../components/Reports/Decisions/MakeDecision"
import { TopTen } from "../components/NextOrders/TopTen"
import { Overview } from "../components/NextOrders/Overview"

export const NextOrders = () => {

  const { idBranch } = useParams()
  const { idInforme } = useParams()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser } = useUser()

  const [nextOrders, setNextOrders] = useState<NextOrders>()

  const [overview, setOverview] = useState<boolean>(false);
  const [urgently, setUrgently] = useState<boolean>(true);

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


  function changeSection() {
    setOverview(!overview)
    setUrgently(!urgently)
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
              onClick={() => changeSection()}
            >
              Top Ten
            </h2>
            <h2
              className={`text-lg font-semibold p-4 px-8 hover:cursor-pointer hover:opacity-80 ${overview && "-bg--color-black bg-opacity-10"} `}
              onClick={() => changeSection()}
            >
              Overview
            </h2>
          </header>
          {
            nextOrders &&
            (
              urgently
                ?
                <TopTen nextOrders={nextOrders} />
                :
                <Overview nextOrders={nextOrders} />
            )
          }
        </section>
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