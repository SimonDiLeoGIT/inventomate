interface Company {
  idEmpresa: number
  nombreEmpresa: string
  descripcion: string
  logo: string
  sucursales: Branch[]
  owner: User
}