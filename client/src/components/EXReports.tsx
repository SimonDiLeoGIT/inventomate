import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react"
import { getCompany } from "../utils/Database.service";

export const EXReports = () => {

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
    <select className="w-full -bg--color-border-very-lightest-grey p-2 hover:cursor-pointer">
      {
        company?.sucursales.map(sucursal => {
          return (
            <option value={sucursal.idSucCliente} className="-bg--color-white hover:cursor-pointer">{sucursal.nombre}</option>
          )
        })
      }
    </select>
  )
}