import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "../hook/useUser"
import { SideNavbar } from "../components/SideNavbar"
import { ReportHeaderTitle } from "../components/ReportHeaderTitle"
import { ChartSection } from "../components/ChartSection"
import { getForecastById } from "../utils/Services/forecast.database.service"
import { ProductForecastInfo } from "../components/ProductForecastInfo"

export const SalesForecasting = () => {

  const { idBranch } = useParams()
  const { idInforme } = useParams()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser } = useUser()

  const [forecast, setForecast] = useState<Forecast | null>()
  const [product, setProduct] = useState<ProductForecast>()
  const [type, setType] = useState<number>(1)

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)

      if (idBranch && idInforme) {
        const response = await getForecastById(accessToken, idBranch, idInforme)
        setForecast(response)
        console.log(response)
        setProduct(response?.estimaciones_por_producto[0])
      }

    }

    isAuthenticated && getToken()

  }, [isAuthenticated])


  const handleChangeOption = (id: string) => {
    const p = forecast?.estimaciones_por_producto.find(product => product.id_producto === parseInt(id))
    if (p !== undefined) setProduct(p)
  }

  const handleChangeType = (id: string) => {
    setType(parseInt(id))
  }

  return (
    <main className="-text--color-black flex mb-4">
      <section className="hidden relative lg:block w-64">
        <SideNavbar />
      </section>
      <section className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
        <header className="">
          <ReportHeaderTitle title="Sales Forecasting" />
        </header>
        <section className="my-4">
          <form className='my-4'>
            <div className=''>
              <select
                className="w-full -bg--color-border-very-lightest-grey p-2 hover:cursor-pointer rounded-lg shadow-md -shadow--color-light-opaque-pink"
                onChange={(e) => handleChangeOption(e.target.value)}
              >
                {
                  forecast?.estimaciones_por_producto.map(product => {
                    return (
                      <option value={product.id_producto} className="-bg--color-white hover:cursor-pointer">{product.nombre_producto}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className='mt-4'>
              <select
                className="w-full -bg--color-border-very-lightest-grey p-2 hover:cursor-pointer rounded-lg shadow-md -shadow--color-light-opaque-pink"
                onChange={(e) => handleChangeType(e.target.value)}
                id="select_chart"
              >
                <option value={1} className="-bg--color-white hover:cursor-pointer">Per Month</option>
                <option value={2} className="-bg--color-white hover:cursor-pointer">Per Semester</option>
                <option value={3} className="-bg--color-white hover:cursor-pointer">Per Year</option>
              </select>
            </div>
          </form>
          {
            product
            &&
            <>
              <ChartSection product={product} type={type} />
              <ProductForecastInfo product={product} />
            </>
          }
        </section>
      </section>
    </main>
  )
}