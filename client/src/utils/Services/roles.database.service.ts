import axios from "axios"

export const editMemberRoles = async (accessToken: string, idBranch: string, idUser: number, idRol: number[]) => {
  try {
    const url = `http://spring-inventomate:8080/api/sucursales/${idBranch}/users/${idUser}/roles/${idRol}/edit`
    const body = {
      idSucursal: idBranch,
      idUsuario: idUser,
      idsRol: idRol
    }
    const response = await axios({
      url: url,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: body
    })
    console.log(response)
    return response.data
  } catch (error: any) {
    return error?.response
  }
}

export const getRoles = async (accessToken: string): Promise<Rol[] | null> => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/roles',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    console.log(response)
    return response.data
  } catch (error: any) {
    return error?.response
  }
}

export const getMembertRoles = async (accessToken: string, idBranch: string, idUser: number): Promise<Rol[] | null> => {
  try {
    const url = `http://localhost:8080/api/sucursales/${idBranch}/users/${idUser}/roles`
    const response = await axios({
      url: url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    console.log(response)
    return response.data
  } catch (error: any) {
    return error?.response
  }
}