import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { useUser } from "../hook/useUser"
import { SideNavbar } from "../components/SideNavbar"
import { ReportHeaderTitle } from "../components/ReportHeaderTitle"
import data from '../assets/obsolescencia.json'

export const Obsolescense = () => {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser } = useUser()

  const [obsolescense, setObsolescense] = useState<Obsolescense>()


  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)
      setObsolescense(data)
      // if (idBranch && idInforme) {
      //   const response = await getNextOrderById(accessToken, idBranch, idInforme)
      //   setObsolescense(response)
      // }

    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  return (
    <main className="-text--color-black flex">
      <section className="hidden relative lg:block w-64">
        <SideNavbar />
      </section>
      <section className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
        <header className="p-2">
          <ReportHeaderTitle title="Next Orders" />
        </header>
        <ul className="my-4">
          {
            obsolescense?.productos_obsoletos.map((product) => {
              return (
                <li className="-bg--color-border-very-lightest-grey rounded-lg shadow-md -shadow--color-black-shadow mb-4 overflow-hidden">
                  <ul>
                    <li className="grid grid-cols-2 p-2">
                      <p className="m-auto ml-0">
                        Product Id
                      </p>
                      <p>
                        {product.id_producto}
                      </p>
                    </li>
                    <li className="grid grid-cols-2 -bg--color-white p-2">
                      <p className="m-auto ml-0">
                        Product Name
                      </p>
                      <p>
                        {product.nombre}
                      </p>
                    </li>
                    <li className="grid grid-cols-2 p-2">
                      <p className="m-auto ml-0">
                        Recommended promotion
                      </p>
                      <p>
                        {product.promo_recomendada}
                      </p>
                    </li>
                  </ul>
                </li>
              )
            })
          }
        </ul>
      </section>
    </main>
  )
}