import axios, { AxiosError } from "axios"
import { handleApiError } from "../errorHander"
import { url } from "./api.service"

export const getNextOrders = async (accessToken: string, idBranch: string, page: number | 0, size: number | 10, direction: 'asc' | 'desc', desde: string | null, hasta: string | null, visto: boolean | null): Promise<Report> => {

  let data = `?page=${page}&size=${size}&sortDirection=${direction}`

  if (desde !== null) {
    data += `&desde=${desde}`
  }
  if (hasta !== null) {
    data += `&hasta=${hasta}`
  }
  if (visto !== null) {
    data += `&visto=${visto}`
  }

  try {
    const response = await axios({
      url: `${url}api/informes/siguientes-pedidos/${idBranch}${data}`,
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
      url: `${url}api/informes/siguientes-pedidos/${idBranch}`,
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

export const getNextOrderById = async (accessToken: string, idBranch: string, idInforme: string): Promise<NextOrders> => {
  try {
    const response = await axios({
      url: `${url}api/informes/siguientes-pedidos/` + idInforme + '/sucursales/' + idBranch,
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