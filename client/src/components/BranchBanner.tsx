import React from "react";
import { CompanyBanner } from "./CompanyBanner";

interface props {
  branch: BranchCompany | null
}

export const BranchBanner: React.FC<props> = ({ branch }) => {

  return (
    <section>
      <CompanyBanner />
      <h2 className="text-lg font-bold -text--color-semidark-violet">
        {branch?.sucursal.nombre}
      </h2>
      <ul className="text-xs -text--color-mate-dark-violet">
        <li className="w-full flex space-x-2">
          <h3 className="font-bold">ID</h3>
          <p>{branch?.sucursal.idSucCliente}</p>
        </li>
        <li className="w-full flex space-x-2">
          <h3 className="font-bold">Location</h3>
          <p>{branch?.sucursal.ubicacion}</p>
        </li>
      </ul>
    </section>
  );
};
