import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../hook/useUser";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SideNavbar } from "../components/Global/SideNavbar";
import { getCompany } from "../utils/Services/company.database.service";
import { CompanyBanner } from "../components/Company/CompanyBanner";
import { Searcher } from "../components/Searcher";
import { CompanyBranches } from "../components/Company/CompanyBranches";
import { Pagination } from "../components/Global/Pagination";

export const Company = () => {

  const { currentUser, setUser } = useUser()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [company, setCompany] = useState<Company | null>(null)
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)

      try {

        const response = await getCompany(accessToken)
        setCompany(response)
        setBranches(response?.sucursales)
      } catch (e: any) {
        console.log('ocurrión un error solicitando la compania')
      }
    }

    isAuthenticated && getToken()

    console.log(branches)

  }, [isAuthenticated])

  return (
    <main className="-text--color-black flex">
      <section className="hidden relative lg:block w-64">
        <SideNavbar />
      </section>
      <section className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
        <CompanyBanner />
        <section className="my-4">
          <h2 className="font-bold -text--color-semidark-violet py-2 text-lg">Branches</h2>
          {
            company && currentUser
            &&
            <CompanyBranches branches={branches} user={currentUser} />
          }
        </section>
      </section>
    </main>
  );
};
