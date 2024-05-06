import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ArrowButtons } from "../components/ArrowButtons"
import { useTrends } from "../hook/useTrends";

export const Product = () => {

  const { category } = useParams();
  const { position } = useParams();

  const { newTrends } = useTrends()

  const [currentImage, changeCurrentImage] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);


  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    newTrends?.trends.map(trend => {
      if (trend.category_name === category) {
        trend.products.map(p => {
          if (position && p.trend_position === parseInt(position)) {
            setProduct(p)
          }
        })
      }
    })
  }, [position])

  return (
    <main className="-text--color-black flex ">
      <section className="md:grid md:grid-cols-2 md:w-11/12 md:m-auto max-w-7xl md:my-10">
        <div className="relative z-0">
          <section className="">
            <img
              className="h-96 object-cover m-auto"
              src={product?.pictures[currentImage].url}
            />
          </section>
          <ArrowButtons currentImage={currentImage} changeCurrentImage={changeCurrentImage} setTranslateValue={setTranslateValue} carousel={false} cant={product?.pictures.length} />
        </div>
        <section className="md:grid">
          <div className="p-4 -text--color-black md:grid place-content-center">
            <h1 className="text-xl">
              <strong>
                {product?.name}
              </strong>
            </h1>
            <div className="mt-2 flex items-center">
              <p className=" -bg--color-light-opaque-pink inline-block p-1 text-sm -text--color-semidark-violet font-medium rounded-md">{product?.trend_position}° Trend Position</p>
              <p className="m-auto mr-2 text-lg">{product?.additional_info.buy_box_winner.currency_id}${product?.additional_info.buy_box_winner.price}</p>
            </div>
          </div>
        </section>
        <section className="w-11/12 m-auto col-span-2 md:w-full">
          <header className=" my-2">
            <h2 className="text-lg font-semibold">Features</h2>
          </header>
          <ul className="w-/full m-auto rounded-lg overflow-hidden shadow-md -shadow--color-black-shadow">
            {
              product?.attributes.map((atribute, index) => {
                return (
                  <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4 ${(index % 2 === 0) && '-bg--color-border-very-lightest-grey'}`}>
                    <p>{atribute.name}</p>
                    <p>{atribute.value_name}</p>
                  </li>
                )
              })
            }
          </ul>
        </section>
        <section className="w-11/12 m-auto my-4 col-span-2 md:w-full">
          <header>
            <h2 className="text-lg font-semibold my-2">Description</h2>
          </header>
          <p>
            {product?.additional_info.short_description.content}
          </p>
        </section>
      </section>
    </main >
  )
}