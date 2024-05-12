import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../hook/useUser";
import { useEffect, useState } from "react";
import { getCompany, getDatabaseConnection, getNewTrends, getTrends } from "../utils/Database.service";
import { SideNavbar } from "../components/SideNavbar";
import { useTrends } from "../hook/useTrends";
import treds_icon from '../assets/icons/violet-new-trends.svg'
import { Requesting } from "../components/Requesting";
import { NoTrends } from "../components/Errors/NoTrends";
import { EmptyHistory } from "../components/Errors/EmptyHistory";
import { NoDatabaseConnection } from "../components/Errors/NoDatabaseConnection";
import { TrendReports } from "../components/TrendReports";

export const Trends = () => {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();


  const { currentUser, setUser } = useUser()
  // const { setNewTrends } = useTrends()

  const [requesting, setRequesting] = useState<boolean>(false)
  const [company, setCompany] = useState<Company | null>(null)
  const [database, setDatabase] = useState<boolean>(true)
  const [trendReports, setTrendReports] = useState<TrendReport[] | null>(null)

  const [branch, setBranch] = useState<string>('')

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)

      const userCompany = await getCompany(accessToken)
      setCompany(userCompany)

    }

    isAuthenticated && getToken()

    if (currentUser?.sucursal?.idSucursal !== undefined)
      setBranch(currentUser?.sucursal?.idSucursal.toString())

  }, [isAuthenticated])


  const getDatabase = async (accessToken: string): Promise<boolean> => {
    const dc = await getDatabaseConnection(accessToken)
    if (dc === null) {
      return false
    } else
      return true
  }

  const handleGetNewTrends = async () => {
    setRequesting(true)
    const accessToken = await getAccessTokenSilently()

    if (await getDatabase(accessToken)) {
      const response = await getNewTrends(accessToken, branch)
      // if (response !== null) {
      //   setNewTrends(response)
      // }
    } else {
      setDatabase(false)
      setRequesting(false)
    }
  }

  const handleChangeOption = async (e: any) => {
    console.log('e: ', e.target.value)
    setBranch(e.target.value)
    console.log('branch: ', branch)
    // if (currentUser?.sucursal?.idSucursal !== undefined) {
    const accessToken = await getAccessTokenSilently()
    const response = await getTrends(accessToken, e.target.value)
    setTrendReports(response)
    console.log('trends: ', response)
    // }
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
                <option value="" className="-bg--color-white hover:cursor-pointer">Seleccione una sucursal</option>
                {
                  company?.sucursales.map(sucursal => {
                    return (
                      <option value={sucursal.idSucursal} className="-bg--color-white hover:cursor-pointer">{sucursal.nombre}</option>
                    )
                  })
                }
              </select>
            }
            <button
              className="-bg--color-semidark-violet -text--color-white font-semibold p-2 rounded-lg max-w-sm"
              onClick={() => handleGetNewTrends()}
            >
              Discover New Trends
            </button>
          </div>
        </header>
        {requesting ?
          <Requesting />
          :
          database ? (
            ((trendReports !== null) ?
              trendReports.length === 0 ?
                <NoTrends />
                :
                <TrendReports trendReports={trendReports} idBranch={branch} />
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