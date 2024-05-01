interface UserCompany {
  usuario: User
  empresa: Company | null
  sucursal: Branch | null
  roles: Rol[]
}