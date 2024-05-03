import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ArrowButtons } from "../components/ArrowButtons"
import { useTrends } from "../hook/useTrends";
import { Carousel } from "react-responsive-carousel";

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
        <div className="max-w-lg relative">
          <section className="">
            <img
              className="h-96 object-cover m-auto"
              src={product?.pictures[currentImage].url}
            />

          </section>
          <ArrowButtons currentImage={currentImage} changeCurrentImage={changeCurrentImage} setTranslateValue={setTranslateValue} carousel={false} cant={product?.pictures.length} />
        </div>
        <section className="md:grid">
          <div className="p-6 -text--color-black md:grid place-content-center">
            <h1 className="text-xl">
              <strong>
                {product?.name}
              </strong>
            </h1>
          </div>
        </section>
      </section>
    </main >
  )
}