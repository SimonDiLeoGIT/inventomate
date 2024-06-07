import axios from "axios";

export const registerBranch = async (accessToken: string, body: { nombre: string, ubicacion: string, idSucCliente: number }) => {
  try {
    const response = await axios({
      url: 'http://spring-inventomate:8080/api/sucursales/create',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: body
    })
    console.log(response)
  } catch (error) {
    return error
  }
}

export const getBranch = async (accessToken: string, idBranch: string): Promise<BranchCompany | null> => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/sucursales/' + idBranch,
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