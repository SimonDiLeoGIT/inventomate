import axios, { AxiosError } from "axios"
import { handleApiError } from "../errorHander"
import { url } from "./api.service"

export const getGestors = async (accessToken: string) => {
  try {
    const response = await axios({
      url: `${url}api/bd-empresa/gestores`,
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

export const existsDatabaseConnection = async (accessToken: string): Promise<boolean> => {
  try {
    const response = await axios({
      url: `${url}api/empresas/exists/bd-empresa`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
    return response.data as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};