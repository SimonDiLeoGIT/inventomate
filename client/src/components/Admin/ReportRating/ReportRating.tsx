import React, { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { WaitingResponse } from "../../Messages/WaitingResponse"
import { DoneMessage } from "../../Messages/DoneMessage"
import done from '../../../assets/icons/done.svg'
import close_icon from '../../../assets/icons/close.svg'
import rating_icon from '../../../assets/icons/rating.svg'
import { Justification } from "../../Reports/Justification"
import { RatingStars } from "./RatingStars"
import { postRate } from "../../../utils/Services/Reports/rating.service"

interface props {
  idBranch: string
  idReport: string
}

export const ReportRating: React.FC<props> = ({ idBranch, idReport }) => {


  const { getAccessTokenSilently } = useAuth0();

  const [rating, setRating] = useState<number>(0)
  const [reasons, setReasons] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)

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
    if (idBranch !== undefined) {
      const accessToken = await getAccessTokenSilently()
      await postRate(accessToken, idBranch, idReport, rating, reasons)
      closeForm()
      setShow(true)
      setVisible(true)
      setTimeout(() => {
        setVisible(false)
        setTimeout(() => {
          setShow(false)
        }, 2000)
      }, 2000)
    }
    setLoading(false)
  }

  function closeForm() {
    setRating(0)
    setReasons('')
    handleMenuOpen()
  }

  return (
    <>
      <button
        className=" p-2 rounded-full -bg--color-semidark-violet shadow-md -shadow--color-black absolute top-4 right-4 hover:cursor-pointer hover:opacity-80"
        onClick={handleMenuOpen}
      >
        <img src={rating_icon} className="w-4 m-auto" />
      </button>

      <aside className={`fixed w-screen h-screen overflow-hidden top-0 left-0 ${!isOpen && 'hidden'} opacity-animation grid place-content-center z-10`}>
        <section className='-bg--color-white p-4 relative w-80 md:w-screen md:max-w-xl rounded-lg shadow-md '>
          <header className="w-full flex items-center mb-2">
            <h1 className="font-semibold">Tell us your opinion</h1>
            <button
              className="m-auto mr-0"
              onClick={() => closeForm()}
            >
              <img src={close_icon} className="w-5 m-auto" />
            </button>
          </header>
          <Justification justificacion="Your opinion will be anonymous. It will help us to improve our reports!" />
          <form className="relative" onSubmit={handleSubmit}>
            <RatingStars rating={rating} setRating={setRating} />
            <div className="grid my-2">
              <label className="font-semibold -text--color-violet-user-email text-sm">Write your reasons</label>
              <textarea
                value={reasons}
                onChange={(e) => setReasons(e.target.value)}
                className="border -border--color-border-light-grey rounded-lg p-2 disabled:-text--color-border-light-grey"
                rows={2}
                required
              />
            </div>
            <div className="mt-4">
              {
                !loading
                  ?
                  <button
                    type="submit"
                    className="-bg--color-semidark-violet font-bold -text--color-white w-full  p-2 rounded-lg hover:opacity-80"
                  >
                    Confirm
                  </button>
                  :
                  <WaitingResponse message="Editing Roles" />
              }
            </div>
          </form>
        </section>
      </aside>
      {
        show
        &&
        <DoneMessage message="¡Thank you for your assessment!" visible={visible} image={done} />
      }
    </>
  )
}