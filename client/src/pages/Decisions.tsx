import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useUser } from "../hook/useUser"
import { SideNavbar } from "../components/SideNavbar"
import { ReportHeaderTitle } from "../components/ReportHeaderTitle"
import { getDecisionsFromReport } from "../utils/Services/decision.database.service"

export const Decisions = () => {

  const { idBranch } = useParams()
  const { idInforme } = useParams()
  const { type } = useParams()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser, currentUser } = useUser()

  const [decisions, setDecisions] = useState<Decision[]>([])


  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)

      if (idBranch && idInforme) {
        const response = await getDecisionsFromReport(accessToken, idInforme, idBranch)
        setDecisions(response)
        console.log(response)
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
          <ReportHeaderTitle title="Decisions" />
        </header>
        <Link
          to={`/company/reports/${type}/${idBranch}/${idInforme}`}
          className="p-4 -bg--color-semidark-violet -text--color-white font-semibold rounded-lg block max-w-sm m-auto text-center hover:opacity-80"
        >
          View Report
        </Link>
        <section className="my-4 max-w-3xl m-auto">
          {
            decisions?.map((decision) => {
              return (
                <article className="shadow-md -shadow--color-black-shadow rounded-lg p-4 relative mb-8">
                  <header className="flex items-center space-x-2">
                    <img src={decision.usuario_decision.picture} className="w-8 rounded-full" />
                    <p className="font-semibold">
                      {decision.usuario_decision.nickname}
                      <span className="mx-1 text-xs -text--color-semidark-violet">{decision.usuario_decision.email === currentUser?.usuario.email && '(you)'}</span>
                    </p>
                  </header>
                  <div className="absolute top-6 right-4 font-semibold text-sm">
                    {
                      decision.decision.aceptado ?
                        <p className="-text--color-semidark-violet">ACCEPTED</p>
                        :
                        <p className="-text--color-ful-red">REJECTED</p>
                    }
                  </div>
                  <div className="my-4 ml-2 w-10/12 ">
                    <p>{decision.decision.justificacion}</p>
                  </div>
                </article>
              )
            })
          }
        </section>
      </section>
    </main>
  )
}