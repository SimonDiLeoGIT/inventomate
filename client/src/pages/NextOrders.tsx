import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "../hook/useUser"
import { SideNavbar } from "../components/SideNavbar"
import { ReportHeaderTitle } from "../components/ReportHeaderTitle"
import { getNextOrderById } from "../utils/Services/nextOrders.database.service"
import { MakeDecision } from "../components/MakeDecision"
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export const NextOrders = () => {

  const { idBranch } = useParams()
  const { idInforme } = useParams()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser } = useUser()

  const [nextOrders, setNextOrders] = useState<NextOrder>()


  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)

      if (idBranch && idInforme) {
        const response = await getNextOrderById(accessToken, idBranch, idInforme)
        setNextOrders(response)
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
        <header className="p-2">
          <ReportHeaderTitle title="Next Orders" />
        </header>
        <ul className="my-4">
          {
            nextOrders?.pedidos.map((order) => {
              return (
                <li className="-bg--color-border-very-lightest-grey rounded-lg shadow-md -shadow--color-black-shadow mb-4 overflow-hidden">
                  <ul>
                    <li className="grid grid-cols-2 p-2">
                      <p className="m-auto ml-0">
                        Product Id
                      </p>
                      <p>
                        {order.id_producto}
                      </p>
                    </li>
                    <li className="grid grid-cols-2 -bg--color-white p-2">
                      <p className="m-auto ml-0">
                        Product Name
                      </p>
                      <p>
                        {order.nombre_producto}
                      </p>
                    </li>
                    <li className="grid grid-cols-2 p-2">
                      <p className="m-auto ml-0">
                        Actual Stock
                      </p>
                      <p>
                        {order.stock_actual}
                      </p>
                    </li>
                    <li className="grid grid-cols-2 p-2 -bg--color-white">
                      <p className="m-auto ml-0">
                        Quantity To Order
                      </p>
                      <p>
                        {order.cantidad_a_comprar}
                      </p>
                    </li>
                    <li className="grid grid-cols-2 p-2">
                      <p className="m-auto ml-0">
                        Justification
                      </p>
                      <p>
                        {order.justificacion}
                      </p>
                    </li>
                  </ul>
                </li>
              )
            })
          }
        </ul>
        <div className="my-4">
          {
            idInforme && idBranch &&
            <MakeDecision idReport={idInforme} idBranch={idBranch} />
          }
        </div>
      </section>
    </main>
  )
}