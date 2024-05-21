import { Doughnut } from "react-chartjs-2"

interface props {
  product: ProductForecast
}

export const DoughnutChart: React.FC<props> = ({ product }) => {
  return (
    <div className='hover:cursor-pointer w-full min-h-64  max-h-72 m-auto mr-0 rounded-xl shadow-md -shadow--color-black-shadow p-4'>
      <Doughnut
        className='w-full m-auto'
        data={{
          labels: ['Profit', 'Investment'],
          datasets: [
            {
              label: product.nombre_producto,
              data: [product.ganancia, product.inversion],
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
  )
}