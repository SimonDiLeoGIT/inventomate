import { Link } from "react-router-dom"
import { useUser } from "../hook/useUser"
import company_settings from '../assets/icons/white-settings.svg'

export const CompanyBanner = () => {

  const { currentUser } = useUser()

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
        <div className="flex m-auto mr-0">
          {
            currentUser?.roles.some(rol => rol.idRol === 1)
            &&
            <Link to='./company-settings'
              className="flex items-center p-2 font-bold text-sm -bg--color-semidark-violet -text--color-white justify-center rounded-xl max-w-md m-auto mr-0 mb-0"
            >
              <img
                src={company_settings}
                className="w-4 mr-2"
              />
              <p className="overflow-hidden whitespace-nowrap text-ellipsis">Company Settings</p>
            </Link>
          }
        </div>
      </div>
    </section>
  );
};
