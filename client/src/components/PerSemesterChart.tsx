import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

interface props {
  product: ProductForecast
}

export const PerSemesterChart: React.FC<props> = ({ product }) => {


  return (
    <section>
      <div className='hover:cursor-pointer rounded-xl shadow-md -shadow--color-black-shadow p-4'>
        <Bar
          className='w-full'
          data={{
            labels: product.graficoCantidadVendidaXSemestre.X.map(x => x),
            datasets: [
              {
                label: product.nombre_producto,
                data: product.graficoCantidadVendidaXSemestre.Y.map(y => y),
                backgroundColor: product.graficoCantidadVendidaXSemestre.Y.map((_, index, array) => {
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
              labels: product.graficoCantidadVendidaXSemestre.X.map(x => x),
              datasets: [
                {
                  label: product.nombre_producto,
                  data: product.graficoCantidadVendidaXSemestre.Y.map(y => y),
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
      <div className='my-4 rounded-lg shadow-md -shadow--color-black-shadow grid grid-cols-2 gap-4 -bg--color-border-very-lightest-grey p-2'>
        <p className='font-semibold'>Sales Forecast</p>
        <p>{product.cantidad_ventas_estimadas_proximo_semestre}</p>
      </div>
    </section>
  );
};