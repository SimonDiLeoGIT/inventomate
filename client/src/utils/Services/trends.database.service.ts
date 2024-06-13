import axios from "axios"
import { url } from "./api.service"

export const getTrends = async (accessToken: string, idBranch: string, page: number | 0, size: number | 10, direction: 'asc' | 'desc', desde: string | null, hasta: string | null, visto: boolean | null): Promise<Report> => {

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
      url: `${url}api/informes/tendencias/${idBranch}${data}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    console.log(response)
    return response.data
  } catch (error: any) {
    return error
  }
}

export const getTrendById = async (accessToken: string, idBranch: string, idInforme: string): Promise<Trends | null> => {
  try {
    const response = await axios({
      url: `${url}api/informes/tendencias/` + idInforme + '/sucursales/' + idBranch,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    console.log(response.data)
    return response.data
  } catch (error: any) {
    return null
  }
}

export const getNewTrends = async (accessToken: string, idBranch: string) => {
  try {
    const response = await axios({
      url: `${url}api/informes/tendencias/` + idBranch,
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