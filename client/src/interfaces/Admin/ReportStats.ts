interface ReportStats {
  cantInformes: number
  cantInformesTendencias: number
  cantInformesProyeccion: number
  cantInformesNexTrends: number
  cantInformesObsolescencia: number
  tiemposPromedio: number
  tiemposPromedioTendencias: number
  tiemposPromedioProyeccion: number
  tiemposPromedioNexTrends: number
  tiemposPromedioObsolescencia: number
}

interface TimeReport {
  content: ReportContent[]
  pageable: Pageable
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: Sort
  first: boolean
  numberOfElements: number
  empty: boolean
}

interface ReportContent {
  id: number
  informe: Report
  tipoInforme: string
  fecha: string
  tiempoInicio: string
  tiempoFin: string
  duracionSegundos: number
}

interface Report {
  id: number,
  fecha: string,
  idMongo: string,
  tipoInforme: string,
  visto: boolean
}