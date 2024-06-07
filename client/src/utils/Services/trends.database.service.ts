import axios from "axios"
import { url } from "./api.service"

export const getTrends = async (accessToken: string, idBranch: string): Promise<Report[] | null> => {
  try {
    const response = await axios({
<<<<<<< HEAD
      url: 'http://spring-inventomate:8080/api/informes/tendencias/' + idBranch,
=======
      url: `${url}api/informes/tendencias/` + idBranch,
>>>>>>> 34a40045ecc9db5c75f617f9f0f0323025d5886e
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    console.log(response)
    return response.data
  } catch (error: any) {
    return null
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