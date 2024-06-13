export default function calculateInvestmentProfitPercent(product: ProductForecast): [number, number] {
    const { ganancia, inversion } = product
    const total = ganancia + inversion
    if (total === 0) return [0, 0]
    const profitPercentage = (ganancia / total) * 100
    const investmentPercentage = (inversion / total) * 100
    return [parseFloat(profitPercentage.toFixed(2)), parseFloat(investmentPercentage.toFixed(2))]
}