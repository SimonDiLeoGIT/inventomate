import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

interface props {
  x: string[]
  y: number[]
  label: string
}

export const BarChart: React.FC<props> = ({ x, y, label }) => {

  return (
    <div className='hover:cursor-pointer rounded-xl shadow-md -shadow--color-black-shadow p-4'>
      <Bar
        className='w-full'
        data={{
          labels: x.map(x => x),
          datasets: [
            {
              label: label,
              data: y.map(y => y),
              backgroundColor: 'rgba(171, 127, 182, 0.4)',
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
  );
};