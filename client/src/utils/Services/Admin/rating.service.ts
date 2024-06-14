import axios from "axios";
import { url } from "../api.service";

export const getRatingStats = async (accessToken: string): Promise<RatingStats> => {
  try {
    const response = await axios({
      url: `${url}api/admin/valoraciones/stats`,
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

export const getRatings = async (accessToken: string, page: number | 0, size: number | 10, sort: keyof RatingContent, order: 'asc' | 'desc', reportType: string | null): Promise<Rating> => {

  let data = `?page=${page}&size=${size}&sort=${sort}&order=${order}`

  if (reportType !== null) {
    data += `&tipoInforme=${reportType}`
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