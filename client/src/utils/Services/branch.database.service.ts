import axios from "axios";
import { url } from "./api.service";

export const registerBranch = async (accessToken: string, body: { nombre: string, ubicacion: string, idSucCliente: number }) => {
  try {
    const response = await axios({
<<<<<<< HEAD
      url: 'http://spring-inventomate:8080/api/sucursales/create',
=======
      url: `${url}api/sucursales/create`,
>>>>>>> 34a40045ecc9db5c75f617f9f0f0323025d5886e
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
      url: `${url}api/sucursales/` + idBranch,
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