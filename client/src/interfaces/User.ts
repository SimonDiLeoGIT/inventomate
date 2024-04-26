interface User {
  idUsuario: number
  idAuth0: string
  nickname: string
  email: string
  sucursal: Branch | null
  roles: Rol[]
}