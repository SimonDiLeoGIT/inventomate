import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import { useState } from 'react'
Chart.register(...registerables)

interface props {
  forecast: Forecast
}

export const ChartComponent: React.FC<props> = ({ forecast }) => {

  const [product, setProduct] = useState<ProductForecast>(forecast.estimaciones_por_producto[0])

  const handleChangeOption = (id: string) => {
    const p = forecast.estimaciones_por_producto.find(product => product.id_producto === parseInt(id))
    if (p !== undefined) setProduct(p)
  }


  return (
    <section>
      <form className='my-4'>
        <div className='max-h-24'>
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
      </form>
      <div className='hover:cursor-pointer rounded-xl shadow-md -shadow--color-black-shadow p-4'>
        <Bar
          className='w-full'
          data={{
            labels: product.graficoCantidadVendidaXFecha.X.map(x => x),
            datasets: [
              {
                label: product.nombre_producto,
                data: product.graficoCantidadVendidaXFecha.Y.map(y => y),
                backgroundColor: product.graficoCantidadVendidaXFecha.Y.map((_, index, array) => {
                  return index === array.length - 1 ? 'rgba(65, 0, 82, 0.8)' : 'rgba(171, 127, 182, 0.4)';
                }),
                borderColor: 'rgba(171, 127, 182)'
              }
            ]
          }}
          options={{
            maintainAspectRatio: false, // Permite al gráfico ajustarse al tamaño del contenedor
            responsive: true, // Permite al gráfico ser responsive
          }}
        />
      </div>
      <div className='xl:grid grid-cols-2 place-content-center gap-8 my-4 w-full'>
        <div className='w-full h-full hover:cursor-pointer min-h-64 max-h-72 m-auto ml-0 rounded-xl shadow-md -shadow--color-black-shadow p-4'>
          <Line
            className='w-full max-w-full m-auto'
            data={{
              labels: product.graficoCantidadVendidaXFecha.X.map(x => x),
              datasets: [
                {
                  label: product.nombre_producto,
                  data: product.graficoCantidadVendidaXFecha.Y.map(y => y),
                  borderColor: 'rgba(65, 0, 82, 0.6)',
                  backgroundColor: 'rgba(65, 0, 82)'
                }
              ]
            }}
            options={{
              maintainAspectRatio: false, // Permite al gráfico ajustarse al tamaño del contenedor
              responsive: true, // Permite al gráfico ser responsive
            }}
          />
        </div>
        <div className='hover:cursor-pointer w-full min-h-64  max-h-72 m-auto mr-0 rounded-xl shadow-md -shadow--color-black-shadow p-4'>
          <Doughnut
            className='w-full m-auto'
            data={{
              labels: ['Profit', 'Investment'],
              datasets: [
                {
                  label: product.nombre_producto,
                  data: [80.4, 10.5],
                  // data: [product.ganancia, product.inversion],
                  backgroundColor: [
                    'rgba(0, 121, 7, 0.8)',
                    'rgba(146, 0, 0, 0.8)'
                  ],
                  borderColor: 'rgba(65, 0, 82, 0.1)'
                }
              ]
            }}
            options={{
              maintainAspectRatio: false, // Permite al gráfico ajustarse al tamaño del contenedor
              responsive: true, // Permite al gráfico ser responsive
            }}
          />
        </div>
      </div>
      <ul className='w-full my-4 rounded-lg overflow-hidden shadow-md -shadow--color-black-shadow'>
        <li className='grid grid-cols-2 gap-4 -bg--color-border-very-lightest-grey p-2'>
          <p className='font-semibold'>Sales Quantity</p>
          <p>{product.cantidad_ventas}</p>
        </li>
        <li className='grid grid-cols-2 gap-4 p-2'>
          <p className='font-semibold'>Sales Forecast</p>
          <p>{product.cantidad_ventas_estimadas}</p>
        </li>
        <li className='grid grid-cols-2 gap-4 -bg--color-border-very-lightest-grey p-2'>
          <p className='font-semibold'>Profit</p>
          <p>{product.ganancia}</p>
        </li>
      </ul>
    </section>
  );
};