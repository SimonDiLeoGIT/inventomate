import { useAuth0 } from "@auth0/auth0-react"
import { useUser } from "../hook/useUser"
import React, { useEffect, useState } from "react"
import { getCompany } from "../utils/Services/company.database.service"
import { ReportHeaderTitle } from "./ReportHeaderTitle"
import { WaitingResponse } from "./WaitingResponse"

interface props {
  title: string
  button_text: string
  handleChangeOption: (branch: string) => void
  buttonEvent: () => void
  requesting: boolean
  branch: string
}

export const ReportHeader: React.FC<props> = ({ title, button_text, handleChangeOption, buttonEvent, requesting, branch }) => {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();


  const { currentUser } = useUser()

  const [company, setCompany] = useState<Company | null>(null)

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()

      const userCompany = await getCompany(accessToken)
      setCompany(userCompany)

    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  return (
    <header className="py-2">
      <ReportHeaderTitle title={title} />
      <div className="mt-4 grid gap-2">
        {currentUser?.roles.some(role => role.idRol === 1)
          &&
          <select
            className="w-full -bg--color-border-very-lightest-grey p-2 hover:cursor-pointer"
            onChange={(e) => handleChangeOption(e.target.value)}
          >
            <option value="" className="-bg--color-white hover:cursor-pointer">Select Branch</option>
            {
              company?.sucursales.map(sucursal => {
                return (
                  <option value={sucursal.idSucursal} className="-bg--color-white hover:cursor-pointer">{sucursal.nombre}</option>
                )
              })
            }
          </select>
        }
        {
          requesting ?
            <WaitingResponse message="Requesting new Report" />
            :
            branch !== ''
            &&
            <button
              className="-bg--color-semidark-violet -text--color-white font-semibold p-2 rounded-lg max-w-sm hover:opacity-80"
              onClick={() => buttonEvent()}
            >
              {button_text}
            </button>
        }
      </div>
    </header>
  )
}