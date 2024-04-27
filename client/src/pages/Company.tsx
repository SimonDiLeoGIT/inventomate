import { useAuth0 } from "@auth0/auth0-react";
import { SideNavbar } from "../components/SideNavbar";
import { useUser } from "../hook/useUser";
import { useEffect } from "react";

export const Company = () => {

  const { currentUser, setUser } = useUser()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)
      console.log(currentUser)
    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  return (
    <main className="grid grid-cols-4 -text--color-black">
      <section className="">
        <SideNavbar />
      </section>
      <section className="col-span-3 mt-4">
        <div className="flex items-center">
          <img src={currentUser?.empresa?.logo} className='w-20 mr-4' />
          <h1 className="text-xl font-bold">{currentUser?.empresa?.nombreEmpresa}</h1>
        </div>
        <ul>
          <li>
            <p>creator</p>
            <img />
            <p>{currentUser?.nickname}</p>
            <p>{currentUser?.email}</p>
          </li>
        </ul>
      </section>
    </main>
  );
};
