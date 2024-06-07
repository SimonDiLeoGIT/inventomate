import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

interface props {
  x: string[]
  y: number[]
  label: string
}

export const LineChart: React.FC<props> = ({ x, y, label }) => {

  return (
    <div className='hover:cursor-pointer rounded-xl shadow-md -shadow--color-black-shadow p-4'>
      <Line
        className='w-full'
        data={{
          labels: x.map(x => x),
          datasets: [
            {
              label: label,
              data: y.map(y => y),
              borderColor: 'rgba(65, 0, 82, 0.6)',
              backgroundColor: 'rgba(65, 0, 82)'
            }
          ]
        }}
        options={{
          maintainAspectRatio: false, // Permite al gráfico ajustarse al tamaño del contenedor
          responsive: true, // Permite al gráfico ser responsive
          scales: {
            y: {
              reverse: true
            }
          }
        }}
      />
    </div>
  );
};