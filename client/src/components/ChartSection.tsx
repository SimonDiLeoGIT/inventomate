import { Chart, registerables } from 'chart.js'
import { PerYearChart } from './PerYearChart'
import { PerSemesterChart } from './PerSemesterChart'
import { PerDateChart } from './PerDateChart'
Chart.register(...registerables)

interface props {
  product: ProductForecast
  type: number
}

export const ChartSection: React.FC<props> = ({ product, type }) => {


  if (type === 1) {
    return <PerDateChart product={product} />
  }
  if (type === 2) {
    return <PerSemesterChart product={product} />
  }
  if (type === 3) {
    return <PerYearChart product={product} />
  }
};