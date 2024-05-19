import { useAuth0 } from "@auth0/auth0-react"
import { useUser } from "../hook/useUser"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { SideNavbar } from "../components/SideNavbar"
import { getBranch } from "../utils/Services/branch.database.service"
import { InviteUser } from "../components/InviteUser"
import { EditMemberRoles } from "../components/EditMemberRoles"
import { BranchBanner } from "../components/BranchBanner"
import { Searcher } from "../components/Searcher"

export const Branch = () => {

  const { idBranch } = useParams()
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const { currentUser, setUser } = useUser()

  const [branch, setBranch] = useState<BranchCompany | null>(null)

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)
      if (idBranch !== undefined) {
        const userBranch = await getBranch(accessToken, idBranch)
        setBranch(userBranch)
      }
    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  return (
    <main className="-text--color-black flex">
      <section className="hidden relative lg:block w-64">
        <SideNavbar />
      </section>
      <section className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
        <BranchBanner branch={branch} />
        <section className="my-4">
          <h2 className="font-bold -text--color-semidark-violet py-2 text-lg border-b mb-2">Members</h2>
          <div className="grid grid-cols-2">
            <Searcher />
            {
              idBranch !== undefined && currentUser?.roles.some(rol => rol.idRol === 1)
              &&
              <InviteUser idBranch={idBranch} />
            }
          </div>
          <ul className="my-4 grid w-full m-auto grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {
              branch?.usuarios.map(user => {
                return (
                  <li className="-bg--color-border-very-lightest-grey rounded-xl h-28 md:h-32">
                    {
                      currentUser?.roles.some(rol => rol.idRol === 1)
                        ?
                        <EditMemberRoles idBranch={idBranch} user={user} />
                        :
                        <div
                          className="h-full w-full grid place-content-center"
                        >
                          <img src={user?.picture} className="w-12 rounded-full m-auto" />
                          {user?.nickname}
                        </div>
                    }
                  </li>
                )
              })
            }
          </ul>
        </section>
      </section>
    </main>
  );
};
