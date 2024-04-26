import axios from "axios";
import { JwtPayload } from "jwt-decode";

export const getUser = async (accessToken: string) => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/users/me',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })

    console.log("response:", response)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const signUpUser = async (accessToken: string) => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/users/sign-up',
      method: 'POST',
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`,
      }
    })

    console.log("response:", response)

  } catch (error) {
    console.log(error)
  }
}

export const getCompany = async (accessToken: JwtPayload) => {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/empresas/me',
      method: 'GET',
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }
    })
    console.log("response:", response)

    return response
  } catch (error) {
    console.log(error)
    return error
  }
}