import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import close_icon from '../assets/icons/close.svg'
import { postDecision } from "../../../utils/Services/decision.database.service";
import { WaitingResponse } from "../../Messages/WaitingResponse";
import { DoneMessage } from "../../Messages/DoneMessage";
import done from '../assets/icons/done.svg'

interface props {
  idReport: string
  idBranch: string
}

export const MakeDecision: React.FC<props> = ({ idReport, idBranch }) => {

  const { getAccessTokenSilently } = useAuth0();

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [decisionMessage, setDicisionMessage] = useState<string>('')
  const [decisionSuccess, setDicisionSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)

  function openForm(success: boolean) {
    setDicisionSuccess(success)
    handleMenuOpen()
  }

  function handleMenuOpen() {
    !isOpen ?
      document.body.classList.add('none-scroll')
      :
      document.body.classList.remove('none-scroll')
    setIsOpen(!isOpen)
  }


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    const accessToken = await getAccessTokenSilently()
    try {
      console.log(idBranch)
      console.log(idReport)
      await postDecision(accessToken, idReport, idBranch, decisionSuccess, decisionMessage)
      handleMenuOpen()
      setShow(true)
      setVisible(true)
      setDicisionMessage('')
      setTimeout(() => {
        setVisible(false)
        setTimeout(() => {
          setShow(false)
        }, 2000)
      }, 2000)
    } catch (e: any) {

    }
    setLoading(false)
  }

  const close = () => {
    setDicisionMessage('')
    handleMenuOpen()
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 max-w-md m-auto">
      <button
        className="-bg--color-ful-red -text--color-white p-4 rounded-xl font-bold hover:opacity-80"
        onClick={() => openForm(false)}
      >
        Dismiss Report
      </button>

      <button
        className="-bg--color-semidark-violet -text--color-white p-4 rounded-xl font-bold hover:opacity-80"
        onClick={() => openForm(true)}
      >
        Uphold Report
      </button>

      <aside className={`fixed w-screen h-screen overflow-hidden top-0 left-0 ${!isOpen && 'hidden'} opacity-animation grid place-content-center z-20`}>
        <section className='-bg--color-white p-4 relative w-screen max-w-xl shadow-lg -shadow--color-black-shadow rounded-xl'>
          <header>
            <h1 className="text-lg font-semibold">Report Your Reasons</h1>
            <button
              className="absolute right-4 top-4"
              onClick={() => close()}
            >
              <img src={close_icon} className="w-5" />
            </button>
          </header>
          <form className="relative" onSubmit={handleSubmit}>
            <div className="grid my-2">
              <label className="font-semibold -text--color-violet-user-email text-sm">Reasons</label>
              <textarea
                value={decisionMessage}
                onChange={(e) => setDicisionMessage(e.target.value)}
                className="border -border--color-border-light-grey rounded-lg p-2 disabled:-text--color-border-light-grey"
                rows={8}
              />
            </div>
            <div className="mt-4">
              {
                !loading
                  ?
                  <button
                    type="submit"
                    className="-bg--color-semidark-violet font-bold -text--color-white w-full p-2 rounded-lg hover:opacity-80"
                  >
                    Confirm
                  </button>
                  :
                  <WaitingResponse message="Reporting Your Reasons" />
              }
            </div>
          </form>
        </section>
      </aside>
      {
        show
        &&
        <DoneMessage message="¡Your reasons were sent!" visible={visible} image={done} />
      }
    </section>
  )
}