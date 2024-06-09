import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "../hook/useUser"
import { SideNavbar } from "../components/Global/SideNavbar"
import { ReportHeaderTitle } from "../components/Reports/ReportHeaderTitle"
import { getNextOrderById } from "../utils/Services/nextOrders.database.service"
import { MakeDecision } from "../components/Reports/Decisions/MakeDecision"
import { NextOrdersChart } from "../components/NextOrders/NextOrdersChart"
import { SuggestionJustification } from "../components/NextOrders/SuggestionJustification"

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
        <ul className="my-4 rounded-lg overflow-hidden shadow-md">
          <li className="grid grid-cols-10 border-b p-2 -bg--color-mate-dark-violet -text--color-white font-bold">
            <p >Id</p>
            <p className="col-span-3">Name</p>
            <p className="col-span-2">Category</p>
            <p className="col-span-2">Actual Stock</p>
            <p className="col-span-2">Quantity To Order</p>
          </li>
          {
            nextOrders &&
            (
              category === "General"
                ?
                nextOrders.top_general.map((order, index) => {
                  return (
                    Object.keys(nextOrders.pedidos).map((categoria) => (
                      nextOrders.pedidos[categoria].map((justificatedOrder) => (
                        justificatedOrder.id_producto === order.id_producto &&
                        <SuggestionJustification order={order} justification={justificatedOrder.justificacion} index={index} category={categoria} />
                      ))
                    ))
                  )
                })
                :
                nextOrders.top_por_categoria[category].flatMap((order, index) =>
                  nextOrders.pedidos[category].flatMap((justificatedOrder) =>
                    justificatedOrder.id_producto === order.id_producto
                      ? <SuggestionJustification
                        key={`${order.id_producto}-${index}`}
                        order={order}
                        justification={justificatedOrder.justificacion}
                        index={index}
                        category={category}
                      />
                      : []
                  ))
            )
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