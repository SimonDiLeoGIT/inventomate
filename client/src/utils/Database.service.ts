import axios from "axios";

export const getUser = async (accessToken: string): Promise<UserCompany | null> => {
  try {
    let response = await getUserCall(accessToken)
    if (response === null) {
      await signUpUser(accessToken)
      response = await getUserCall(accessToken)
    }
    console.log('user: ', response)
    return response
  } catch (error: any) {
    return error.response
  }
}

export const getUserCall = async (accessToken: string): Promise<UserCompany | null> => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/users/me',
      method: 'GET',
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

export const signUpUser = async (accessToken: string): Promise<UserCompany | null> => {
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

export const deleteDatabaseConnection = async (accessToken: string) => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/bd-empresa/delete',
      method: 'DEL',
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
    return error?.response
  }
}

export const getTrends = async (accessToken: string, idBranch: string): Promise<Trends | null> => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/informes/tendencias/' + idBranch,
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