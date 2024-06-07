import axios from "axios";
import { url } from "./api.service";

export const postDecision = async (accessToken: string, idReport: string, idBranch: string, success: boolean, message: string) => {
  try {
    const response = await axios({
      url: `${url}api/informes/decision/${idReport}/sucursales/${idBranch}`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        aceptado: success,
        justificacion: message
      }
    })
    return response
  } catch (error: any) {
    throw error
  }
}

export const getDecisionReports = async (accessToken: string, idBranch: string): Promise<Report[] | null> => {
  try {
    const response = await axios({
      url: `${url}api/informes/decision/${idBranch}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    return response.data
  } catch (error: any) {
    throw error
  }
}

export const getDecisionsFromReport = async (accessToken: string, idReport: string, idBranch: string): Promise<Decision[]> => {
  try {
    const response = await axios({
      url: `${url}api/informes/decision/${idReport}/sucursales/${idBranch}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    return response.data
  } catch (error: any) {
    throw error
  }
}