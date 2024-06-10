import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(...registerables, annotationPlugin);

interface props {
  grafico: Grafico
  label: string
}

export const ObsolescenceBarChart: React.FC<props> = ({ grafico, label }) => {
  const limit = 0.2;

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
              backgroundColor: grafico.Y.map(y => y > limit ? 'rgba(255, 0, 0, 0.6)' : 'rgba(65, 0, 82, 0.6)'),
              borderColor: grafico.Y.map(y => y > limit ? 'rgba(255, 0, 0, 1)' : 'rgba(171, 127, 182)')
            }
          ]
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            annotation: {
              annotations: {
                line1: {
                  type: 'line',
                  yMin: limit,
                  yMax: limit,
                  borderColor: 'rgba(255, 0, 0, 0.8)',
                  borderWidth: 2,
                  label: {
                    content: 'Límite 0.2',
                    // enabled: true,
                    position: 'end'
                  }
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }}
      />
    </div>
  );
};