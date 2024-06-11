import React, { useEffect, useState } from "react"
import { ChartSection } from "./ChartSection"
import { ProductForecastInfo } from "./ProductForecastInfo"

interface props {
  productEstimations: Record<string, ProductForecast[]>
}

export const ForecastOverview: React.FC<props> = ({ productEstimations }) => {

  const [product, setProduct] = useState<ProductForecast>()
  const [type, setType] = useState<number>(1)
  const [category, setCategory] = useState<string>()

  useEffect(() => {
    if (productEstimations) {
      const firstKey = Object.keys(productEstimations)[0]
      setProduct(productEstimations[firstKey][0])
      setCategory(firstKey)
    }
  }, [productEstimations])

  useEffect(() => {
    if (productEstimations && category) {
      setProduct(productEstimations[category][0])
    }
  }, [category])

  const handleChangeOption = (id: string) => {
    if (productEstimations) {
      Object.keys(productEstimations).map((cat) => {
        const p = productEstimations[cat].find(p => p.id_producto === parseInt(id))
        if (p !== undefined) setProduct(p)
      })
    }
  }

  const handleChangeType = (id: string) => {
    setType(parseInt(id))
  }

  const handleChangeCategory = (cat: string) => {
    setCategory(cat)
  }

  return (
    <section>
      <form className='my-4'>
        <div className='grid gap-4 md:grid-cols-2'>
          <select
            className="w-full -bg--color-border-very-lightest-grey p-2 hover:cursor-pointer rounded-lg shadow-md -shadow--color-light-opaque-pink"
            onChange={(e) => handleChangeCategory(e.target.value)}
          >
            {
              productEstimations
              &&
              Object.keys(productEstimations).map((cat) => (
                <option value={cat} className="-bg--color-white hover:cursor-pointer">{cat}</option>
              ))
            }
          </select>
          <select
            className="w-full -bg--color-border-very-lightest-grey p-2 hover:cursor-pointer rounded-lg shadow-md -shadow--color-light-opaque-pink"
            onChange={(e) => handleChangeOption(e.target.value)}
            value={product?.id_producto || ""}
          >
            {
              productEstimations && category
              &&
              productEstimations[category].map(product => {
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
  )
}