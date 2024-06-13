import { useAuth0 } from "@auth0/auth0-react"
import React, { useState } from "react"
import { postDecision } from "../../../utils/Services/decision.database.service"
import { WaitingResponse } from "../../Messages/WaitingResponse"

interface props {
  idReport: string
  idBranch: string
  setShow: (show: boolean) => void
  setVisible: (show: boolean) => void
}

export const MakeDecision: React.FC<props> = ({ idReport, idBranch, setShow, setVisible }) => {

  const { getAccessTokenSilently } = useAuth0();

  const [decisionMessage, setDecisionMessage] = useState<string>('')
  const [decisionSuccess, setDecisionSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    const accessToken = await getAccessTokenSilently()
    try {
      console.log(idBranch)
      console.log(idReport)
      await postDecision(accessToken, idReport, idBranch, decisionSuccess, decisionMessage)
      setDecisionMessage('')
    } catch (e: any) {

    }
    setLoading(false)
    setShow(true)
    setVisible(true)
    setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        setShow(false)
      }, 2000)
    }, 2000)
  }

  return (
    <form className="p-4 m-auto drop-shadow-lg " onSubmit={handleSubmit}>
      <div className="grid my-2">
        <label className="font-semibold -text--color-violet-user-email text-sm">Write your assessment</label>
        <textarea
          value={decisionMessage}
          onChange={(e) => setDecisionMessage(e.target.value)}
          className="border -border--color-border-light-grey rounded-lg p-2 disabled:-text--color-border-light-grey"
          rows={2}
        />
      </div>
      <div className="mt-4">
        {
          !loading
            ?
            <div className="grid grid-cols-2 gap-4 w-1/4 m-auto mr-0">
              <button
                className="-bg--color-ful-red -text--color-white rounded-lg p-2 font-semibold text-lg hover:opacity-80"
                onClick={() => setDecisionSuccess(false)}
                type="submit"
              >
                Reject
              </button>
              <button
                className="-bg--color-green -text--color-white rounded-lg p-2 font-semibold text-lg hover:opacity-80"
                onClick={() => setDecisionSuccess(true)}
                type="submit"
              >
                Accept
              </button>
            </div>
            :
            <WaitingResponse message="Reporting Your Reasons" />
        }
      </div>
    </form>
  )
}