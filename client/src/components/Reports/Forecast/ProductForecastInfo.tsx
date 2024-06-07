interface props {
  product: ProductForecast
}

export const ProductForecastInfo: React.FC<props> = ({ product }) => {
  return (
    <ul className='w-full my-4 rounded-lg overflow-hidden shadow-md -shadow--color-black-shadow'>
      <li className='grid grid-cols-2 gap-4 -bg--color-border-very-lightest-grey p-2'>
        <p className='font-semibold'>Sales Quantity</p>
        <p>{product.cantidad_ventas}</p>
      </li>
      <li className='grid grid-cols-2 gap-4 p-2'>
        <p className='font-semibold'>Profit</p>
        <p>${product.ganancia}</p>
      </li>
      <li className='grid grid-cols-2 gap-4 -bg--color-border-very-lightest-grey p-2'>
        <p className='font-semibold'>Investment</p>
        <p>${product.inversion}</p>
      </li>
      <li className='grid grid-cols-2 gap-4 p-2'>
        <p className='font-semibold'>Difference</p>
        <p>${product.diferencia}</p>
      </li>
    </ul>
  )
}