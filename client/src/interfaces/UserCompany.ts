interface UserCompany {
  usuario: User
  empresa: Company | null
  sucursal: Branch | null
  roles: Rol[]
}

interface newUser {
  idUsuario: number
  nickname: string
  picture: string
  email: string
  empresa: Company | null
  sucursal: Branch | null
  roles: Rol[]
}
