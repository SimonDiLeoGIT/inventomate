import React from "react"
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

interface props {
  grafico: Grafico
}

export const ObsolescenceChart: React.FC<props> = ({ grafico }) => {
  return (
    <div className='hover:cursor-pointer rounded-xl shadow-md -shadow--color-black-shadow p-4'>
      <Bar
        className='w-full'
        data={{
          labels: grafico.X.map(x => x),
          datasets: [
            {
              label: "Obsolescence",
              data: grafico.Y.map(y => y),
              backgroundColor: 'rgba(65, 0, 82, 0.8)',
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
  )
}