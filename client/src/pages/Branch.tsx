import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../hook/useUser";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import search from '../assets/icons/search-.svg'
import { SideNavbar } from "../components/SideNavbar";
import { getBranch } from "../utils/Database.service";
import { InviteUser } from "../components/InviteUser";

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
        <section className="m-auto col-span-3">
          <div className="flex items-center">
            <div className="w-20 h-20 overflow-hidden mr-4">
              <img src={currentUser?.empresa?.logo} className='h-full object-cover' />
            </div>
            <h1 className="text-xl font-bold">{currentUser?.empresa?.nombreEmpresa}</h1>
          </div>
          <div className="flex">
            <ul className="py-2">
              <li>
                <h2 className="font-bold -text--color-semidark-violet">Owner</h2>
                <div className="flex items-center space-x-2">
                  <img
                    src={currentUser?.empresa?.owner.picture}
                    alt={currentUser?.empresa?.owner.nickname}
                    className="w-8 h-8 rounded-full"
                  />
                  <section className="text-sm">
                    <p className="-text--color-violet-user-email font-bold">{currentUser?.empresa?.owner.nickname}</p>
                    <p className="-text--color-violet-user-email">{currentUser?.empresa?.owner.email}</p>
                  </section>
                </div>
              </li>
              <li className="w-full flex space-x-2">
                <h2 className="font-bold -text--color-semidark-violet">ID</h2>
                <p>{branch?.sucursal.idSucCliente}</p>
              </li>
              <li className="w-full flex space-x-2">
                <h2 className="font-bold -text--color-semidark-violet">Name</h2>
                <p>{branch?.sucursal.nombre}</p>
              </li>
              <li className="w-full flex space-x-2">
                <h2 className="font-bold -text--color-semidark-violet">Location</h2>
                <p>{branch?.sucursal.ubicacion}</p>
              </li>
            </ul>
          </div>
        </section>
        <section className="my-4">
          <h2 className="font-bold -text--color-semidark-violet py-2 text-lg border-b ">Members</h2>
          <div className="grid grid-cols-2">
            {
              idBranch !== undefined &&
              currentUser?.roles.some(rol => rol.idRol === 1) &&
              <InviteUser idBranch={idBranch} />
            }
            <form className={`-bg--color-border-very-lightest-grey p-2 rounded-lg  w-full max-w-72 flex my-2 ${currentUser?.roles.some(rol => rol.idRol === 1) && ' m-auto mr-0 '}`}>
              <input type="text" placeholder="Search" className="-bg--color-border-very-lightest-grey w-full " />
              <img src={search} className="w-4" />
            </form>
          </div>
          <ul className="my-4 grid w-full m-auto grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {
              branch?.usuarios.map(user => {
                return (
                  <li className="-bg--color-border-very-lightest-grey rounded-xl text-center h-28 md:h-32 grid place-content-center">
                    <img src={user?.picture} className="w-12 rounded-full m-auto" />
                    <p className="">{user?.nickname}</p>
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
