import axios from "axios";
import { url } from "../api.service";

export const getReportStats = async (accessToken: string): Promise<ReportStats> => {
  try {
    const response = await axios({
      url: `${url}api/admin/informes/stats`,
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

export const getTimeReports = async (accessToken: string, page: number | 0, size: number | 10, sort: keyof ReportContent, order: 'asc' | 'desc', reportType: string | null, desde: string | null, hasta: string | null): Promise<TimeReport> => {
  // ?page=0&size=10&sort=duracionSegundos&sortDirection=asc&tipoInforme=ANALISIS_DE_TENDENCIA&desde=2023-01-01&hasta=2025-12-31

  let data = `?page=${page}&size=${size}&sort=${sort}&sortDirection=${order}`

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
      url: `${url}api/admin/informes/tiempos${data}`,
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