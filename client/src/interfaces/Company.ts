interface Company {
  idEmpresa: number
  nombreEmpresa: string
  descripcion: string
  logo: string
  owner: User
  sucursales: Branch[]
}