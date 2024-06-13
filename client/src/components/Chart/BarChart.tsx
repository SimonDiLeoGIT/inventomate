import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

interface props {
  grafico: Charts
  label: string
}

export const BarChart: React.FC<props> = ({ grafico, label }) => {

  return (
    <div className='hover:cursor-pointer rounded-xl shadow-md -shadow--color-black-shadow p-4'>
      <Bar
        className='w-full'
        data={{
          labels: grafico.X.map(x => x),
          datasets: [
            {
              label: label,
              data: grafico.Y.map(y => y),
              backgroundColor: 'rgba(65, 0, 82, 0.6)',
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