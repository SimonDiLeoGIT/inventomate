import React from "react"
import { Link } from "react-router-dom"

interface props {
  company: Company | null
}

export const CompanyBranches: React.FC<props> = ({ company }) => {
  return (
    <ul className="my-4 grid w-full m-auto">
      <li className="grid grid-cols-5 border-b p-2 -bg--color-mate-dark-violet -text--color-white font-bold rounded-t-lg">
        <p className="">ID</p>
        <p className="col-span-2">Name</p>
        <p className="col-span-2">Location</p>
      </li>
      {company?.sucursales.length === 0 ?
        <li className="-bg--color-border-very-lightest-grey h-48 grid place-content-center">
          <p className="font-medium text-lg text-center p-4">
            It looks like there are no branches in your company yet. :(
          </p>
          <Link to='/company/register-branch' className="-bg--color-semidark-violet p-2 rounded-lg font-semibold -text--color-white w-32 text-center m-auto hover:opacity-80">Add Branch</Link>
        </li>
        : (
          company?.sucursales.map((branch) => {
            return (
              <li className="grid grid-cols-5 hover:opacity-60">
                <p><Link to={`/company/branch/${branch.idSucursal}`} className="block p-2">{branch.idSucCliente}</Link></p>
                <p className="col-span-2"><Link to={`/company/branch/${branch.idSucursal}`} className="block p-2">{branch.nombre}</Link></p>
                <p className="col-span-2"><Link to={`/company/branch/${branch.idSucursal}`} className="block p-2">{branch.ubicacion}</Link></p>
              </li>
            )
          })
        )
      }
    </ul>
  )
}