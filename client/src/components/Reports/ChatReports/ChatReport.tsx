import React, { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import done from '../../../assets/icons/done.svg'
import { DoneMessage } from "../../Messages/DoneMessage"
import { useUser } from "../../../hook/useUser"
import { getDecisionsFromReport } from "../../../utils/Services/decision.database.service"
import { MakeDecision } from "./ChatForm"

interface props {
  idBranch: string
  idInforme: string
}

export const ReportChat: React.FC<props> = ({ idBranch, idInforme }) => {


  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser, currentUser } = useUser()

  const [decisions, setDecisions] = useState<Decision[]>([])

  const [visible, setVisible] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)


  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)

      if (idBranch && idInforme) {
        const response = await getDecisionsFromReport(accessToken, idInforme, idBranch)
        setDecisions(response)

      }

    }

    isAuthenticated && getToken()

  }, [isAuthenticated, show])


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
                <div className="my-4 ml-2 w-10/12 ">
                  <p>{decision.decision.justificacion}</p>
                </div>
              </article>
            )
          })
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