import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useUser } from "../hook/useUser"
import { getTrendById } from "../utils/Database.service"
import { SideNavbar } from "../components/SideNavbar"
import { useTrends } from "../hook/useTrends"

export const Trend = () => {

  const { idBranch } = useParams()
  const { idInforme } = useParams()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser } = useUser()
  const { trends, setTrends } = useTrends()


  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)

      const response = await getTrendById(accessToken, idBranch, idInforme)
      setTrends(response)

    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  return (
    <main className="-text--color-black flex">
      <section className="hidden relative lg:block w-64">
        <SideNavbar />
      </section>
      <section className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
        {
          trends?.trends.map((trend) => {
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
          })
        }
      </section>
    </main>
  )
}