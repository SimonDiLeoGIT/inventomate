import axios from "axios";
import { url } from "../api.service";

export const postRate = async (accessToken: string, idBranch: string, idReport: string, stars: number, reason: string) => {
  try {
    const data = {
      cantEstrellas: stars,
      valoracion: reason
    }
    const response = await axios({
      url: `${url}api/informes/valorar/${idReport}/sucursales/${idBranch}`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: data
    })
    console.log(response)
  } catch (error) {
    return error
  }
}