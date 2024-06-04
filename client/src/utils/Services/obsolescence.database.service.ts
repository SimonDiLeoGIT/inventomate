import axios, { AxiosError } from "axios"
import { handleApiError } from "../errorHander"

export const getObsoletProductsReports = async (accessToken: string, idBranch: string): Promise<Report[]> => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/informes/obsolescencia/' + idBranch,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    console.log(response)
    return response.data
  } catch (error: any) {
    const apiError = handleApiError(error as AxiosError);
    throw apiError;
  }
}

export const getNewObsoletProducts = async (accessToken: string, idBranch: string): Promise<Report[]> => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/informes/obsolescencia/' + idBranch,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    console.log(response)
    return response.data
  } catch (error: any) {
    const apiError = handleApiError(error as AxiosError);
    throw apiError;
  }
}

export const getObsolescenceById = async (accessToken: string, idBranch: string, idInforme: string): Promise<Obsolescense> => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/informes/obsolescencia/' + idInforme + '/sucursales/' + idBranch,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    console.log(response.data)
    return response.data
  } catch (error: any) {
    const apiError = handleApiError(error as AxiosError);
    throw apiError
  }
}