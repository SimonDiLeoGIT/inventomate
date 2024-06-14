import axios from "axios";
import { url } from "../api.service";

export const getErrors = async (accessToken: string, page: number | 0, size: number | 10, sort: keyof RatingContent, order: 'asc' | 'desc', reportType: string | null, desde: string | null, hasta: string | null): Promise<Rating> => {

  // api/admin/errores?page=0&size=10&sort=hora&sortDirection=asc&horaInicio=16:26:00&horaFin=18:26:00

  let data = `?page=${page}&size=${size}&sort=${sort}&order=${order}`

  if (reportType !== null) {
    data += `&tipoInforme=${reportType}`
  }

  if (desde !== null) {
    data += `&desde=${desde}`
  }
  if (hasta !== null) {
    data += `&hasta=${hasta}`
  }

  try {
    const response = await axios({
      url: `${url}api/admin/valoraciones${data}`,
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