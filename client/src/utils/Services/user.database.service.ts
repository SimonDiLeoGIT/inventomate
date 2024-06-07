import axios from "axios";

const urlUser = 'http://spring-inventomate:8080/api/users'

export const getUser = async (accessToken: string): Promise<UserCompany | number> => {
  try {
    let response = await getUserCall(accessToken)
    if (response === 404) {
      await signUpUser(accessToken)
      response = await getUserCall(accessToken)
    }
    console.log('user: ', response)
    return response
  } catch (error: any) {
    return error.response
  }
}

export const getUserCall = async (accessToken: string): Promise<UserCompany | number> => {
  try {
    const response = await axios({
      url: `${urlUser}/me`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    return response.data
  } catch (error: any) {
    return error.response.status
  }
}

export const signUpUser = async (accessToken: string): Promise<UserCompany | null> => {
  try {
    const response = await axios({
      url: `${urlUser}/sign-up`,
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

export const editUser = async (accessToken: string, nickname: string, picture: string): Promise<UserCompany | null> => {
  try {
    const body = {
      nickname: nickname,
      picture: picture
    }
    const response = await axios({
      url: `${urlUser}/edit`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: body
    })
    return response.data
  } catch (error: any) {
    return error?.response
  }
}

export const editUserPass = async (accessToken: string): Promise<Ticket | null> => {
  try {
    const response = await axios({
      url: `${urlUser}/edit/password`,
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

export const searchUser = async (accessToken: string, email: string): Promise<User[] | null> => {
  try {
    const response = await axios({
      url: `${urlUser}?email=${email}`,
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

export const inviteUser = async (accessToken: string, idBranch: string, idUser: number, idRol: number[]) => {
  try {
    const url = `http://localhost:8080/api/sucursales/${idBranch}/invite/${idUser}/role/${idRol}`
    const body = {
      idSucursal: idBranch,
      idUsuario: idUser,
      idRol: idRol
    }
    const response = await axios({
      url: url,
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