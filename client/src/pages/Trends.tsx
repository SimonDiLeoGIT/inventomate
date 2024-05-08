import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../hook/useUser";
import { useEffect, useState } from "react";
import { getCompany, getDatabaseConnection, getTrends } from "../utils/Database.service";
import { SideNavbar } from "../components/SideNavbar";
import { useTrends } from "../hook/useTrends";
import treds_icon from '../assets/icons/violet-new-trends.svg'
import { Requesting } from "../components/Requesting";
import { TrendsSection } from "../components/TrendsSection";
import { NoTrends } from "../components/Errors/NoTrends";
import { EmptyHistory } from "../components/Errors/EmptyHistory";
import { NoDatabaseConnection } from "../components/Errors/NoDatabaseConnection";

export const Trends = () => {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();


  const { currentUser, setUser } = useUser()
  const { newTrends, setTrends } = useTrends()

  const [requesting, setRequesting] = useState<boolean>(false)
  const [company, setCompany] = useState<Company | null>(null)
  const [database, setDatabase] = useState<boolean>(true)

  const [branch, setBranch] = useState<string>('')

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)
      const userCompany = await getCompany(accessToken)
      setCompany(userCompany)

    }

    isAuthenticated && getToken()
    if (currentUser?.sucursal?.idSucCliente !== undefined)
      setBranch(currentUser?.sucursal?.idSucCliente.toString())

  }, [isAuthenticated])


  const getDatabase = async (accessToken: string): Promise<boolean> => {
    const dc = await getDatabaseConnection(accessToken)
    if (dc === null) {
      return false
    } else
      return true
  }

  const getNewTrends = async () => {
    setRequesting(true)
    const accessToken = await getAccessTokenSilently()

    if (await getDatabase(accessToken)) {
      const trends = await getTrends(accessToken, branch)
      if (trends !== null) {
        setTrends(trends)
      }
    } else {
      setDatabase(false)
      setRequesting(false)
    }
  }

  const handleChangeOption = (e: any) => {
    console.log('e: ', e.target.value)
    setBranch(e.target.value)
    console.log('branch: ', branch)
  }

  return (
    <main className="-text--color-black flex">
      <section className="hidden relative lg:block w-64">
        <SideNavbar />
      </section>
      <section className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
        <header className="p-2">
          <div className="flex items-center">
            <div className='mr-1 -bg--color-light-opaque-pink inline-block rounded-full p-1 border -border--color-semidark-violet shadow-md -shadow--color-semidark-violet'>
              <img src={treds_icon} className='w-4' />
            </div>
            <h1 className="font-bold -text--color-semidark-violet text-2xl">New Trends</h1>
          </div>
          <div className="mt-4 grid gap-2">
            {currentUser?.roles.some(role => role.idRol === 1)
              &&
              <select
                className="w-full -bg--color-border-very-lightest-grey p-2 hover:cursor-pointer"
                value={branch}
                onChange={(e) => handleChangeOption(e)}
              >
                {
                  company?.sucursales.map(sucursal => {
                    return (
                      <option value={sucursal.idSucCliente} className="-bg--color-white hover:cursor-pointer">{sucursal.nombre}</option>
                    )
                  })
                }
              </select>
            }
            <button
              className="-bg--color-semidark-violet -text--color-white font-semibold p-2 rounded-lg max-w-sm"
              onClick={() => getNewTrends()}
            >
              Discover New Trends
            </button>
          </div>
        </header>
        {requesting ?
          <Requesting />
          :
          database ? (
            ((newTrends !== null) ?
              newTrends.trends.length === 0 ?
                <NoTrends />
                :
                <TrendsSection newTrends={newTrends} />
              :
              <EmptyHistory />
            ))
            :
            <NoDatabaseConnection />
        }
      </section>
    </main>
  )
}