interface BranchCompany {
  empresa: {
    idEmpresa: number
    nombreEmpresa: string
    descripcion: string
    logo: string
    owner: User
  },
  sucursal: {
    idSucursal: number
    nombre: string
    ubicacion: string
    idSucCliente: number
  },
  usuarios: User[]
}