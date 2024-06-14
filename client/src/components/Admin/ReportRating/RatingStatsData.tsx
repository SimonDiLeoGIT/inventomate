interface props {
  stats: RatingStats
}

export const RatingStatsData: React.FC<props> = ({ stats }) => {
  return (
    <ul className="w-/full m-auto rounded-lg overflow-hidden shadow-md -shadow--color-black-shadow">
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4 -bg--color-border-very-lightest-grey`}>
        <p>Quantity of Assessments</p>
        <p>{stats.cantValoraciones}</p>
      </li>
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4`}>
        <p>Trends Assessments</p>
        <p>{stats.cantValoracionesTendencias}</p>
      </li>
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4 -bg--color-border-very-lightest-grey`}>
        <p>Trends Rating</p>
        <p>{stats.promedioValoracionesTendencias}</p>
      </li>
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4`}>
        <p>Next Orders Assessments</p>
        <p>{stats.cantValoracionesNexTrends}</p>
      </li>
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4 -bg--color-border-very-lightest-grey`}>
        <p>Next Orders Rating</p>
        <p>{stats.promedioValoracionesNexTrends}</p>
      </li>
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4`}>
        <p>Obsolescence Assessments</p>
        <p>{stats.cantValoracionesObsolescencia}</p>
      </li>
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4 -bg--color-border-very-lightest-grey`}>
        <p>Obsolescence Rating</p>
        <p>{stats.promedioValoracionesObsolescencia}</p>
      </li>
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4`}>
        <p>Forecast Assessments</p>
        <p>{stats.cantValoracionesProyeccion}</p>
      </li>
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4 -bg--color-border-very-lightest-grey`}>
        <p>Forecast Rating</p>
        <p>{stats.promedioValoracionesProyeccion}</p>
      </li>
    </ul>
  )
}