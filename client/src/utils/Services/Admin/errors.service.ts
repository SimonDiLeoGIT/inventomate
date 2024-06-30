import axios from "axios";
import { url } from "../api.service";

export const getErrors = async (accessToken: string, page: number | 0, size: number | 10, sort: keyof ErrorContent, order: 'asc' | 'desc', desde: string | null, hasta: string | null): Promise<Errors> => {

  let data = `?page=${page}&size=${size}&sort=${sort}&sortDirection=${order}`

  if (desde !== null) {
    data += `&desde=${desde}`
  }
  if (hasta !== null) {
    data += `&hasta=${hasta}`
  }

  try {
    const response = await axios({
      url: `${url}api/admin/errores${data}`,
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