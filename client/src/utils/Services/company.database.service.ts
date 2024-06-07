import axios, { AxiosError } from "axios"
import { handleApiError } from "../errorHander"

const urlCompany = 'http://spring-inventomate:8080/api/empresas'

export const registerCompany = async (accessToken: string, body: { nombreEmpresa: string, descripcion: string, logo: string }) => {
  try {
    const response = await axios({
      url: `${urlCompany}/create`,
      method: 'POST',
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: body
    })
    console.log(response)
  } catch (error) {
    return error
  }
}


export const getCompany = async (accessToken: string): Promise<Company | any> => {
  try {
    const response = await axios({
      url: `${urlCompany}/profile`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    return response.data
  } catch (error: any) {
    const apiError = handleApiError(error as AxiosError);
    throw apiError;
  }
}

export const deleteCompany = async (accessToken: string) => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/empresas/delete',
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    return response.data
  } catch (error: any) {
    return error?.response
  }
}