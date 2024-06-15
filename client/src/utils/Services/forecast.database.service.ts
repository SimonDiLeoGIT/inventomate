import axios from "axios"
import { url } from "./api.service"

export const getForecasts = async (accessToken: string, idBranch: string, page: number | 0, size: number | 10, direction: 'asc' | 'desc', desde: string | null, hasta: string | null, visto: boolean | null): Promise<Report> => {

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
      url: `${url}api/informes/proyeccion-de-ventas/${idBranch}${data}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    console.log(response)
    return response.data
  } catch (error: any) {
    return error
  }
}

export const getForecastById = async (accessToken: string, idBranch: string, idInforme: string): Promise<Forecast> => {
  try {
    const response = await axios({
      url: `${url}api/informes/proyeccion-de-ventas/` + idInforme + '/sucursales/' + idBranch,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    console.log(response.data)
    return response.data
  } catch (error: any) {
    return error
  }
}

export const getNewForecast = async (accessToken: string, idBranch: string) => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate: string = `${year}-${month}-${day}`

    const response = await axios({
      url: `${url}api/informes/proyeccion-de-ventas/` + idBranch + '?fechaProyeccion=' + formattedDate,
      method: 'POST',
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