import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'

interface Role {
  id: string
  name: string
  description: string
}

export const NewUserForm = () => {

  const { getAccessTokenSilently } = useAuth0();

  const [roles, setRoles] = useState<Role[]>()

  useEffect(() => {
    const getRoles = async () => {
      try {
        const accessToken = await getAccessTokenSilently()
        // console.log(accessToken)
        const config = {
          url: 'http://localhost:8080/api/roles',
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const decodedToken = jwtDecode(accessToken)
        console.log("decoded: ", decodedToken)
        const response = await axios(config)
        setRoles(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getRoles()
  }, [getAccessTokenSilently])


  const handleSubmit = () => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessTokenSilently()
        // console.log(accessToken)
        const config = {
          url: 'https://dev-xzd1nw16hc11vsj7.us.auth0.com/dbconnections/signup',
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };

        console.log(config)
        const response = await axios(config)
        console.log("response", response)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }

  return (
    <form className="grid m-auto border mt-24 p-8 w-96 justify-center rounded-lg">
      <input className="w-64 border p-2 mb-4 rounded-lg" type="email" placeholder="Email" />
      <input className="w-64 border p-2 mb-4 rounded-lg" type="password" placeholder="Password" />
      <ul className="mb-4">
        {roles?.map(role => {
          return (
            <li>
              {role.name}
            </li>
          )
        })}
      </ul>
      <button className='m-auto bg-orange-300 w-48 h-12 rounded-lg font-bold text-gray-800 hover:opacity-80' onClick={() => handleSubmit()}>Submit</button>
    </form>
  )
}