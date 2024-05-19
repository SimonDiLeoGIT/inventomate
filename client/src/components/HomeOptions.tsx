import React, { useEffect, useState } from "react"
import { useUser } from "../hook/useUser"
import { Link } from "react-router-dom"
import { Login } from "../pages/Login"

interface props {
  isAuthenticated: boolean
}

export const HomeOptions: React.FC<props> = ({ isAuthenticated }) => {

  const { currentUser } = useUser()

  const [companyLink, setCompanyLink] = useState<string>('')

  useEffect(() => {
    if (currentUser?.roles.some(rol => rol.idRol === 1)) {
      setCompanyLink('/company')
    } else {
      setCompanyLink('/company/branch/' + currentUser?.sucursal?.idSucursal)
    }
    console.log(companyLink)
  }, [])

  return (
    <>
      {!isAuthenticated ?
        <Login />
        :
        (currentUser?.empresa === null ?
          <div className="mt-12 inline-block">
            <Link to='/register-company' className="mt-4 block text-center -bg--color-semidark-violet -text--color-white font-bold text-2xl p-4 rounded-2xl border hover:opacity-80"> Register Company </Link>
          </div>
          :
          <div className="mt-12 inline-block">
            <Link to={companyLink} className="block -bg--color-semidark-violet -text--color-white font-bold text-2xl p-4 rounded-2xl border hover:opacity-80"> View Company </Link>
          </div>
        )
      }
    </>
  )
}