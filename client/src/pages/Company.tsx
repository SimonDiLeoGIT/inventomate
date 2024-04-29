import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../hook/useUser";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import company_settings from '../assets/icons/white-settings.svg'
import add from '../assets/icons/plus-circle-.svg'
import { MobileMenu } from "../components/MobileMenu";

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
    <main className="p-2 -text--color-black">
      {/* <section className="">
        <SideNavbar />
      </section> */}
      <section className="m-auto col-span-3">
        <div className="flex items-center">
          <div className="w-20 h-20 overflow-hidden mr-4">
            <img src={currentUser?.empresa?.logo} className='h-full object-cover' />
          </div>
          <h1 className="text-xl font-bold">{currentUser?.empresa?.nombreEmpresa}</h1>
        </div>
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
            <h2 className="font-bold -text--color-semidark-violet">Location</h2>
            <p>Location</p>
          </li>
        </ul>
        <Link to='/company-settings'
          className="flex items-center p-4 font-bold -bg--color-semidark-violet -text--color-white justify-center rounded-lg"
        >
          <img
            src={company_settings}
            className="w-6 mx-2"
          />
          Company Settings
        </Link>
      </section>
      <section className="my-4">
        <h2 className="font-bold -text--color-semidark-violet py-2 border-b">Branches</h2>
        <ul className="my-4 grid gap-4 w-11/12 m-auto">
          <li className="w-full m-auto text-center -bg--color-light-opaque-pink rounded-xl p-4 font-semibold -text--color-semidark-violet space-y-2">
            <p>ID_Branch</p>
            <p>Name_Branch</p>
            <p>Location_Branch</p>
          </li>
          <li className="w-full m-auto text-center -bg--color-light-opaque-pink rounded-xl p-4 font-semibold -text--color-semidark-violet space-y-2">
            <p>ID_Branch</p>
            <p>Name_Branch</p>
            <p>Location_Branch</p>
          </li>
          <li className="w-full m-auto text-center -bg--color-light-opaque-pink rounded-xl p-4 font-semibold -text--color-semidark-violet space-y-2">
            <p>ID_Branch</p>
            <p>Name_Branch</p>
            <p>Location_Branch</p>
          </li>
          <li className="w-full m-auto text-center rounded-xl p-4 border-4 -border--color-light-opaque-pink">
            <img
              src={add}
              className="opacity-40 w-20 m-auto"
            />
          </li>
        </ul>
      </section>
    </main>
  );
};
