interface RatingStats {
  cantValoraciones: number
  cantValoracionesTendencias: number
  cantValoracionesProyeccion: number
  cantValoracionesNexTrends: number
  cantValoracionesObsolescencia: number
  promedioValoraciones: number
  promedioValoracionesTendencias: number
  promedioValoracionesProyeccion: number
  promedioValoracionesNexTrends: number
  promedioValoracionesObsolescencia: number
}

interface Rating {
  content: RatingContent[]
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

interface RatingContent {
  id: number,
  fecha: string,
  informe: Report[]
  cantEstrellas: number
  valoracion: string
}

interface Report {
  id: number,
  fecha: string,
  idMongo: string,
  tipoInforme: string,
  visto: boolean
}