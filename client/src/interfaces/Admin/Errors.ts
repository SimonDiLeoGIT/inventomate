interface Errors {
  content: ErrorContent[]
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

interface ErrorContent {
  id: number
  titulo: string
  codigo: number
  detalle: string
  fecha: string
  hora: string
}

