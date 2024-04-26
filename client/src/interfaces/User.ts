interface User {
  idUsuario: number
  nickname: string
  picture: string
  email: string
  empresa: Company | null
  sucursal: Branch | null
  roles: Rol[]
}