import { Link } from "react-router-dom"
import { useUser } from "../hook/useUser"
import company_settings from '../assets/icons/white-settings.svg'
import { useEffect, useState } from "react";
import { getDatabaseConnection } from "../utils/Services/database.database.service";
import { useAuth0 } from "@auth0/auth0-react";

export const CompanyBanner = () => {

  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const { currentUser } = useUser()

  const [databaseConnection, setDatabaseConnection] = useState<DatabaseConnection | null>(null)


  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      const dc = await getDatabaseConnection(accessToken)
      setDatabaseConnection(dc)
    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  return (
    <section className="m-auto">
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
              <section className="text-sm">
                <p className="-text--color-violet-user-email font-bold">{currentUser?.empresa?.owner.nickname}</p>
                <p className="-text--color-violet-user-email">{currentUser?.empresa?.owner.email}</p>
              </section>
            </div>
          </li>
        </ul>
        {
          currentUser?.roles.some(rol => rol.idRol === 1)
          &&
          <div className="flex m-auto mr-0 relative p-2">
            <Link to='/company/company-settings'
              className="flex items-center p-2 font-bold text-sm -bg--color-semidark-violet -text--color-white justify-center rounded-xl max-w-md m-auto mr-0 mb-0 hover:opacity-80"
            >
              <img
                src={company_settings}
                className="w-4 mr-2"
              />
              <p className="overflow-hidden whitespace-nowrap text-ellipsis">Company Settings</p>
            </Link>
            {
              databaseConnection === null
              &&
              <div className="-bg--color-ful-red w-3 h-3 rounded-full absolute right-2 top-1 border -border--color-white">

              </div>
            }
          </div>
        }
      </div>
    </section>
  );
};
