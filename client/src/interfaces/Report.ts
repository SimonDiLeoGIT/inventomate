// interface Report {
//   content: Content[]
//   pageable: Pageable
//   last: boolean
//   totalPages: number
//   totalElements: number
//   size: number
//   sort: Sort[]
//   first: boolean
//   numberOfElements: number
//   empty: boolean
// }

interface Report {
  id: number,
  fecha: string,
  tipoInforme: string,
  visto: boolean
}

// interface Pageable {
//   pageNumber: number
//   pageSize: number
//   sort: Sort[]
//   offset: number
//   unpaged: boolean
//   paged: boolean
// }

// interface Sort {
//   direction: string
//   property: string
//   ignoreCase: boolean
//   nullHanding: string
//   ascending: boolean
//   descending: boolean
// }