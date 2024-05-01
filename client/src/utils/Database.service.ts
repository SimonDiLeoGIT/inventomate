import axios, { AxiosResponse } from "axios";
import { JwtPayload } from "jwt-decode";

export const getUser = async (accessToken: string): Promise<UserCompany | null> => {
  let response = await getUserCall(accessToken)
  if (response === null) {
    await signUpUser(accessToken)
    response = await getUserCall(accessToken)
  }
  console.log('user: ', response)
  return response
}

export const getUserCall = async (accessToken: string): Promise<UserCompany | null> => {
  try {
    const response: AxiosResponse<UserCompany> = await axios.get<UserCompany>('http://localhost:8080/api/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    return response.data
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return null
    }
    return error
  }
}

export const signUpUser = async (accessToken: string): Promise<User | null> => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/users/sign-up',
      method: 'POST',
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`,
      }
    })

    return response.data
  } catch (error: any) {
    return error?.response
  }
}

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

export const registerBranch = async (accessToken: string, body: { nombre: string, ubicacion: string, idSucCliente: number }) => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/sucursales/create',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: body
    })
    console.log(response)
  } catch (error) {
    return error
  }
}

export const getBranch = async (accessToken: string, idBranch: string): Promise<BranchCompany | null> => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/sucursales/' + idBranch,
      method: 'GET',
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