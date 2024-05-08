import { Link } from "react-router-dom"

interface props {
  newTrends: Trends
}

export const TrendsSection: React.FC<props> = ({ newTrends }) => {

  return (
    newTrends?.trends.map((trend) => {
      return (
        <section className="p-2">
          <header className="mb-2">
            <h2 className="font-semibold text-lg py-2">{trend.category_name}</h2>
          </header>
          <section className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {trend.products.map((product) => {
              return (
                <article className="-bg--color-form-background-semi-white shadow-md -shadow--color-border-light-grey p-2 block">
                  <figure className="overflow-hidden">
                    <div className="h-48 grid place-content-center overflow-hidden">
                      <Link to={`./${trend.category_name}/${product.trend_position}`}>
                        <img src={product.pictures[0].url} className=" m-auto h-48 object-contain overflow-hidden duration-500 hover:scale-110" />
                      </Link>
                    </div>
                    <figcaption className="p-2 -text--color-black md:text-base">
                      <p className="-bg--color-light-opaque-pink inline-block p-1 text-sm -text--color-semidark-violet font-medium rounded-md">{product.trend_position}° Trend Position</p>
                      <p className="h-[3rem] overflow-hidden text-ellipsis font-semibold">{product.name}</p>
                    </figcaption>
                  </figure>
                </article>
              )
            })}
          </section>
        </section>
      )
    })
  )
}