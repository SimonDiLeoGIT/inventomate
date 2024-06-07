import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useUser } from "../hook/useUser"
import { SideNavbar } from "../components/SideNavbar"
import { ReportHeaderTitle } from "../components/ReportHeaderTitle"
import { getDecisionsFromReport } from "../utils/Services/decision.database.service"
import { DoughnutChart } from "../components/DoughnutChart"
import { Doughnut } from "react-chartjs-2"

export const Decisions = () => {

  const { idBranch } = useParams()
  const { idInforme } = useParams()
  const { type } = useParams()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser, currentUser } = useUser()

  const [decisions, setDecisions] = useState<Decision[]>([])
  const [positive, setPositive] = useState<number>(0)
  const [negative, setNegative] = useState<number>(0)


  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)

      if (idBranch && idInforme) {
        const response = await getDecisionsFromReport(accessToken, idInforme, idBranch)
        setDecisions(response)
        console.log(response)
        let p = 0
        let n = 0
        response.map(r => {
          r.decision.aceptado ? p += 1 : n += 1
        })
        setPositive(p)
        setNegative(n)
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
                        <p className="-text--color-green">ACCEPTED</p>
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
          <div className='hover:cursor-pointer w-full min-h-64  max-h-72 m-auto mr-0 rounded-xl shadow-md -shadow--color-black-shadow p-4'>
            <Doughnut
              className='w-full m-auto'
              data={{
                labels: ['Acepted', 'Rejected'],
                datasets: [
                  {
                    label: "Rate",
                    data: [positive, negative],
                    backgroundColor: [
                      'rgba(0, 121, 7, 0.8)',
                      'rgba(146, 0, 0, 0.8)'
                    ],
                    borderColor: 'rgba(65, 0, 82, 0.1)'
                  }
                ]
              }}
              options={{
                maintainAspectRatio: false, // Permite al gráfico ajustarse al tamaño del contenedor
                responsive: true, // Permite al gráfico ser responsive
              }}
            />
          </div>
        </section>
      </section>
    </main>
  )
}