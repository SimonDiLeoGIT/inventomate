import axios, { AxiosError } from "axios"
import { handleApiError } from "../errorHander"
import { url } from "./api.service"

export const getGestors = async (accessToken: string) => {
  try {
    const response = await axios({
<<<<<<< HEAD
      url: 'http://spring-inventomate:8080/api/bd-empresa/gestores',
=======
      url: `${url}api/bd-empresa/gestores`,
>>>>>>> 34a40045ecc9db5c75f617f9f0f0323025d5886e
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

export const connectDataBase = async (accessToken: string, body: { gestorBd: string, url: string, username: string, password: string }) => {
  try {
    const response = await axios({
      url: `${url}api/bd-empresa/create`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: body
    })
    console.log(response)
    return response.data
  } catch (error: any) {
    return error?.response
  }
}

export const editDatabasConnection = async (accessToken: string, body: { gestorBd: string, url: string, username: string, password: string }) => {
  try {
    const response = await axios({
      url: `${url}api/bd-empresa/edit`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: body
    })
    console.log(response)
    return response.data
  } catch (error: any) {
    const apiError = handleApiError(error as AxiosError);
    throw apiError;
  }
}

export const deleteDatabaseConnection = async (accessToken: string) => {
  try {
    const response = await axios({
      url: `${url}api/bd-empresa/delete`,
      method: 'DELETE',
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

export const getDatabaseConnection = async (accessToken: string): Promise<DatabaseConnection | null> => {
  try {
    const response = await axios({
      url: `${url}api/bd-empresa`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    console.log(response)
    return response.data
  } catch (error: any) {
    return null
  }
}