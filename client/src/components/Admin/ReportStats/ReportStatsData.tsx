interface props {
  stats: ReportStats
}

export const ReportStatsData: React.FC<props> = ({ stats }) => {
  return (
    <ul className="w-full m-auto rounded-lg overflow-hidden shadow-md -shadow--color-black-shadow">
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4 -bg--color-border-very-lightest-grey`}>
        <p>Quantity of Reports</p>
        <p>{stats.cantInformes}</p>
      </li>
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4`}>
        <p>Time Average</p>
        <p>{stats.tiemposPromedio} sec.</p>
      </li>
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4 -bg--color-border-very-lightest-grey`}>
        <p>Quantity of Trends</p>
        <p>{stats.cantInformesTendencias}</p>
      </li>
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4`}>
        <p>Time Average Trends</p>
        <p>{stats.tiemposPromedioTendencias} sec.</p>
      </li>
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4 -bg--color-border-very-lightest-grey`}>
        <p>Quantity of Next Orders</p>
        <p>{stats.cantInformesNexTrends}</p>
      </li>
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4 `}>
        <p>Time Average Next Orders</p>
        <p>{stats.tiemposPromedioNexTrends} sec.</p>
      </li>
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4 -bg--color-border-very-lightest-grey`}>
        <p>Quantity of Obsolescence</p>
        <p>{stats.cantInformesObsolescencia}</p>
      </li>
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4`}>
        <p>Time Average Obsolescence</p>
        <p>{stats.tiemposPromedioObsolescencia} sec.</p>
      </li>
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4 -bg--color-border-very-lightest-grey`}>
        <p>Quantity of Forecast</p>
        <p>{stats.cantInformesProyeccion}</p>
      </li>
      <li className={`grid grid-cols-2 gap-2 p-2 lg:py-4 `}>
        <p>Time Average Forecast</p>
        <p>{stats.tiemposPromedioProyeccion} sec.</p>
      </li>
    </ul>
  )
}