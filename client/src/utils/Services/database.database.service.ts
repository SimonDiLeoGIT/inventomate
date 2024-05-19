import axios from "axios"

export const getGestors = async (accessToken: string) => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/bd-empresa/gestores',
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
      url: 'http://localhost:8080/api/bd-empresa/create',
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
      url: 'http://localhost:8080/api/bd-empresa/edit',
      method: 'PUT',
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

export const deleteDatabaseConnection = async (accessToken: string) => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/bd-empresa/delete',
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
      url: 'http://localhost:8080/api/bd-empresa',
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