import React from "react"

interface props {
  product: Product
}

export const ProductFeatures: React.FC<props> = ({ product }) => {
  return (
    <section>
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
      <section className="w-11/12 m-auto my-4 col-span-2 md:w-full">
        <header>
          <h2 className="text-lg font-semibold my-2">Description</h2>
        </header>
        <p>
          {product?.additional_info.short_description.content}
        </p>
      </section>
    </section>
  )
}