import axios from "axios";

export const registerCompany = async (accessToken: string, body: { nombreEmpresa: string, descripcion: string, logo: string }) => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/empresas/create',
      method: 'POST',
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: body
    })
    console.log(response)
  } catch (error) {
    return error
  }
}

export const getCompany = async (accessToken: string): Promise<Company | null> => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/empresas/profile',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    return response.data
  } catch (error: any) {
    return error?.response
  }
}

export const deleteCompany = async (accessToken: string) => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/empresas/delete',
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    return response.data
  } catch (error: any) {
    return error?.response
  }
}