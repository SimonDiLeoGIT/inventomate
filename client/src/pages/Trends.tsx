import { useAuth0 } from "@auth0/auth0-react";
import { Link, useParams } from "react-router-dom"
import { useUser } from "../hook/useUser";
import { useEffect, useState } from "react";
import { getTrends } from "../utils/Database.service";
import treds_icon from '../assets/icons/new-trends.svg'
import { SideNavbar } from "../components/SideNavbar";
import { useTrends } from "../hook/useTrends";

export const Trends = () => {

  const { idBranch } = useParams()
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const { currentUser, setUser } = useUser()
  const { newTrends, setTrends } = useTrends()


  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)
      if (idBranch !== undefined) {
        const trends = await getTrends(accessToken, idBranch)
        if (trends !== null) setTrends(trends)
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
        <header className="p-2 flex items-center">
          <div className='mr-1 -bg--color-light-opaque-pink inline-block rounded-full p-1 border -border--color-semidark-violet shadow-md -shadow--color-semidark-violet'>
            <img src={treds_icon} className='w-4' />
          </div>
          <h1 className="font-bold -text--color-semidark-violet text-2xl">New Trends</h1>
        </header>
        {newTrends?.trends.map((trend) => {
          return (
            <section className="p-2">
              <header className="mb-2">
                <h2 className="font-semibold text-lg py-2">{trend.category_name}</h2>
              </header>
              <section className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {trend.products.map((product) => {
                  return (
                    <article className="-bg--color-form-background-semi-white shadow-md -shadow--color-border-light-grey p-2 block">
                      <figure className="overflow-hidden">
                        <div className="h-48 grid place-content-center overflow-hidden">
                          <Link to={`./${trend.category_name}/${product.trend_position}`}>
                            <img src={product.pictures[0].url} className=" m-auto h-48 object-contain overflow-hidden duration-500 hover:scale-110" />
                          </Link>
                        </div>
                        <figcaption className="p-2 -text--color-black md:text-base">
                          <p className="-bg--color-light-opaque-pink inline-block p-1 text-sm -text--color-semidark-violet font-medium rounded-md">{product.trend_position}° Trend Position</p>
                          <p className="h-[3rem] overflow-hidden text-ellipsis font-semibold">{product.name}</p>
                        </figcaption>
                      </figure>
                    </article>
                  )
                })}
              </section>
            </section>
          )
        })}
      </section>
    </main>
  )
}