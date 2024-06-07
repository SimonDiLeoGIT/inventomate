import axios from "axios"
import { url } from "./api.service"

export const getForecasts = async (accessToken: string, idBranch: string): Promise<Report[] | null> => {
  try {
    const response = await axios({
<<<<<<< HEAD
      url: 'http://spring-inventomate:8080/api/informes/proyeccion-de-ventas/' + idBranch,
=======
      url: `${url}api/informes/proyeccion-de-ventas/` + idBranch,
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

export const getForecastById = async (accessToken: string, idBranch: string, idInforme: string): Promise<Forecast | null> => {
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
    return null
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