import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react"
import { getCompany } from "../utils/Services/company.database.service";

interface props {
  getReport: () => any;
}

export const GetReport: React.FC<props> = ({ getReport }) => {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

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
    <div className="mt-4 grid gap-2">
      <select className="w-full -bg--color-border-very-lightest-grey p-2 hover:cursor-pointer">
        {
          company?.sucursales.map(sucursal => {
            return (
              <option value={sucursal.idSucCliente} className="-bg--color-white hover:cursor-pointer">{sucursal.nombre}</option>
            )
          })
        }
      </select>
      <button
        className="-bg--color-semidark-violet -text--color-white font-semibold p-2 rounded-lg max-w-sm"
        onClick={() => getReport()}
      >
        Discover New Trends
      </button>
    </div>
  )
}