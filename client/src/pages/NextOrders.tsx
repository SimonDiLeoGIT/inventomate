import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "../hook/useUser"
import { SideNavbar } from "../components/Global/SideNavbar"
import { ReportHeaderTitle } from "../components/Reports/ReportHeaderTitle"
import { getNextOrderById } from "../utils/Services/nextOrders.database.service"
import { MakeDecision } from "../components/Reports/Decisions/MakeDecision"
import { BarChart } from "../components/Chart/BarChart"
import { NextOrdersChart } from "../components/NextOrders/NextOrdersChart"

export const NextOrders = () => {

  const { idBranch } = useParams()
  const { idInforme } = useParams()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser } = useUser()

  const [nextOrders, setNextOrders] = useState<NextOrders>()
  const [category, setCategory] = useState<string>('General')


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

  const handleChangeOption = (id: string) => {
    if (id !== undefined) setCategory(id)
  }


  return (
    <main className="-text--color-black flex">
      <section className="hidden relative lg:block w-64">
        <SideNavbar />
      </section>
      <section className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
        <header className="p-2">
          <ReportHeaderTitle title="Next Orders" />
        </header>
        <h3 className="font-bold -text--color-mate-dark-violet text-lg">Top Ten Products To Order</h3>
        <form className='my-4'>
          <select
            className="w-full -bg--color-border-very-lightest-grey p-2 hover:cursor-pointer rounded-lg shadow-md -shadow--color-light-opaque-pink"
            onChange={(e) => handleChangeOption(e.target.value)}
          >
            <option value={"General"} className="-bg--color-white hover:cursor-pointer">General</option>
            {
              nextOrders && Object.keys(nextOrders.pedidos).map(categoria => {
                return (
                  <option value={categoria} className="-bg--color-white hover:cursor-pointer">{categoria}</option>
                )
              })
            }
          </select>
        </form>
        {
          nextOrders &&
          <NextOrdersChart nextOrders={nextOrders} category={category} />
        }
        {
          nextOrders && category === "General" &&
          <ul className="my-4">
            {nextOrders.top_general.map((pedido, index) => (
              <li key={index}>
                <p><strong>Nombre del producto:</strong> {pedido.nombre_producto}</p>
                <p><strong>Cantidad a comprar:</strong> {pedido.cantidad_a_comprar}</p>
                <p><strong>Stock actual:</strong> {pedido.stock_actual}</p>
              </li>
            ))}
          </ul>
        }
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