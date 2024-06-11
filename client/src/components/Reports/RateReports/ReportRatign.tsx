import React, { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import rate_icon from '../../../assets/icons/rating.svg'
import close_icon from '../../../assets/icons/close.svg'
import done from '../../../assets/icons/done.svg'
import { DoneMessage } from "../../Messages/DoneMessage"
import { Doughnut } from "react-chartjs-2"
import { useUser } from "../../../hook/useUser"
import { getDecisionsFromReport } from "../../../utils/Services/decision.database.service"
import { MakeDecision } from "./MakeDecision"

interface props {
  idBranch: string
  idInforme: string
}

export const ReportRating: React.FC<props> = ({ idBranch, idInforme }) => {


  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser, currentUser } = useUser()

  const [decisions, setDecisions] = useState<Decision[]>([])
  const [positive, setPositive] = useState<number>(0)
  const [negative, setNegative] = useState<number>(0)

  const [visible, setVisible] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)


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

    show && isAuthenticated && getToken()

  }, [show])


  return (
    <section className="">
      <section className="   -bg--color-white">
        <MakeDecision idBranch={idBranch} idReport={idInforme} setShow={setShow} setVisible={setVisible} />
      </section>
      <section className="p-4">
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
        {
          decisions.length > 0
          &&
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
                maintainAspectRatio: false,
                responsive: true
              }}
            />
          </div>
        }
      </section>
      {
        show
        &&
        <DoneMessage message="¡Assessment sent!" visible={visible} image={done} />
      }
    </section>
  )
}