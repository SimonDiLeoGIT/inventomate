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

export const editUser = async (accessToken: string, nickname: string, picture: string): Promise<UserCompany | null> => {
  try {
    const body = {
      nickname: nickname,
      picture: picture
    }
    const response = await axios({
      url: 'http://localhost:8080/api/users/edit',
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
      url: 'http://localhost:8080/api/users/edit/password',
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

export const deleteUser = async (accessToken: string) => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/users/delete',
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

export const searchUser = async (accessToken: string, email: string): Promise<User[] | null> => {
  try {
    const url = `http://localhost:8080/api/users?email=${email}`
    const response = await axios({
      url: url,
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

export const editMemberRoles = async (accessToken: string, idBranch: string, idUser: number, idRol: string[]) => {
  try {
    const url = `http://localhost:8080/api/sucursales/${idBranch}/users/${idUser}/roles/${idRol}/edit`
    const body = {
      idSucursal: idBranch,
      idUsuario: idUser,
      idsRol: idRol
    }
    const response = await axios({
      url: url,
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

export const getRoles = async (accessToken: string): Promise<Rol[] | null> => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/roles',
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

export const getMembertRoles = async (accessToken: string, idBranch: string, idUser: number): Promise<Rol[] | null> => {
  try {
    const url = `http://localhost:8080/api/sucursales/${idBranch}/users/${idUser}/roles`
    const response = await axios({
      url: url,
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