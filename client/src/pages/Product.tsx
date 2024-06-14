import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ArrowButtons } from "../components/Reports/Trends/ArrowButtons"
import { useTrends } from "../hook/useTrends";
import { ProductFeatures } from "../components/Reports/Trends/ProductFeatures";
import { ProductStatistics } from "../components/Reports/Trends/ProductStatistics";
import { Justification } from "../components/Reports/Justification";

export const Product = () => {

  const { category } = useParams();
  const { position } = useParams();

  const { trends } = useTrends()

  const [currentImage, changeCurrentImage] = useState(0);
  const [features, setFeatures] = useState<boolean>(true);
  const [statistics, setStatistics] = useState<boolean>(false);


  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    console.log('posotion: ', position)
    trends?.trends.map(trend => {
      if (trend.category_name === category) {
        trend.products.map(p => {
          if (position && p.trend_position === parseInt(position)) {
            setProduct(p)
            console.log('product: ', p)
          }
        })
      }
    })
  }, [position])

  function changeSection() {
    setFeatures(!features)
    setStatistics(!statistics)
  }

  return (
    <main className="-text--color-black flex ">
      <section className="md:grid md:grid-cols-2 md:w-11/12 md:m-auto max-w-7xl md:my-10">
        <div className="relative z-0">
          <section className="">
            <img
              className="h-96 object-cover m-auto"
              src={product?.pictures[currentImage]?.url}
            />
          </section>
          {
            product
            &&
            <ArrowButtons currentImage={currentImage} changeCurrentImage={changeCurrentImage} carousel={false} cant={product?.pictures.length} />
          }
          {
            product
            &&
            product.procesamiento.meses_en_tendencia === 0
            &&
            <p className="-bg--color-semidark-violet -text--color-white  inline-block p-1 text-sm  font-medium rounded-md absolute top-2 right-2">New Trend</p>
          }
          {
            product?.procesamiento.en_rango_categoria.en_rango
              ?
              <p className="-bg--color-semidark-violet -text--color-white  inline-block p-1 text-sm  font-medium rounded-md absolute top-2 right-2">Recommended</p>
              :
              <p className="-bg--color-ful-red -text--color-white  inline-block p-1 text-sm  font-medium rounded-md absolute bottom-2 right-2">Not Recommended</p>
          }
        </div>
        <section className="md:grid place-content-center">
          <div className="p-4 -text--color-black">
            <h1 className="text-xl">
              <p className="font-semibold">
                {product?.name}
              </p>
              <p className=" -bg--color-light-opaque-pink inline-block p-1 text-sm -text--color-semidark-violet font-medium rounded-md">{product?.trend_position}° Trend Position</p>
            </h1>
            <ul className="mt-2 grid gap-2">
              <li className="">
                <p className="">
                  <strong className="font-semibold">Market Price </strong>
                  {
                    product?.additional_info?.buy_box_winner?.original_price !== null
                    &&
                    <s className="text-sm -bg--color-border-very-lightest-grey p-1 rounded-md shadow-md">{product?.additional_info?.buy_box_winner?.currency_id}${product?.additional_info?.buy_box_winner?.original_price}</s>
                  }
                  {product?.additional_info?.buy_box_winner?.currency_id}${product?.additional_info?.buy_box_winner?.price}
                </p>
              </li>
              <li className="">
                <p><strong className="font-semibold -text--color-semidark-violet">Suggested Price</strong> {product?.additional_info?.buy_box_winner?.currency_id}${product?.procesamiento.precio_sugerido.precio}</p>
              </li>
            </ul>
          </div>
        </section>
        <section className="col-span-2 my-4">
          {
            product
            &&
            <Justification justificacion={product?.procesamiento.en_rango_categoria.justificacion} />
          }
        </section>
        <section className="w-11/12 m-auto col-span-2 md:w-full">
          <header className="my-2 flex border-b-2 -text--color-mate-dark-violet -border--color-mate-dark-violet">
            <h2
              className={`text-lg font-semibold p-4 px-8 hover:cursor-pointer hover:opacity-80 ${features && "-bg--color-black bg-opacity-10"} `}
              onClick={() => changeSection()}
            >
              Features
            </h2>
            <h2
              className={`text-lg font-semibold p-4 px-8 hover:cursor-pointer hover:opacity-80 ${statistics && "-bg--color-black bg-opacity-10"} `}
              onClick={() => changeSection()}
            >
              Statistics
            </h2>
          </header>
          {
            features && product &&
            <ProductFeatures product={product} />
          }
          {
            statistics && product &&
            <ProductStatistics product={product} />
          }
        </section>
      </section>
    </main >
  )
}