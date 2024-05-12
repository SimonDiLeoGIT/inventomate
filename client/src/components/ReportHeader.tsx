import { useAuth0 } from "@auth0/auth0-react"
import { useUser } from "../hook/useUser"
import React, { useEffect, useState } from "react"
import { getCompany } from "../utils/Database.service"
import treds_icon from '../assets/icons/violet-new-trends.svg'
import { ReportHeaderTitle } from "./ReportHeaderTitle"

interface props {
  title: string
  button_text: string
  handleChangeOption: (branch: string) => void
  buttonEvent: () => void
}

export const ReportHeader: React.FC<props> = ({ title, button_text, handleChangeOption, buttonEvent }) => {

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
    <header className="p-2">
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
        <button
          className="-bg--color-semidark-violet -text--color-white font-semibold p-2 rounded-lg max-w-sm"
          onClick={() => buttonEvent()}
        >
          {button_text}
        </button>
      </div>
    </header>
  )
}