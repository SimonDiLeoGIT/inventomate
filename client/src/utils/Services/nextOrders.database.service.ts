import axios, { AxiosError } from "axios"
import { handleApiError } from "../errorHander"

export const getNextOrders = async (accessToken: string, idBranch: string): Promise<Report[]> => {
  try {
    const response = await axios({
      url: 'http://spring-inventomate:8080/api/informes/siguientes-pedidos/' + idBranch,
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

export const getNewNextOrders = async (accessToken: string, idBranch: string): Promise<Report[]> => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/informes/siguientes-pedidos/' + idBranch,
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

export const getNextOrderById = async (accessToken: string, idBranch: string, idInforme: string): Promise<NextOrder> => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/informes/siguientes-pedidos/' + idInforme + '/sucursales/' + idBranch,
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