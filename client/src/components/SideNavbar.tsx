import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'

export const SideNavbar = () => {

  const { getAccessTokenSilently } = useAuth0()

  const [permissions, setPermissions] = useState<string[]>()

  useEffect(() => {

    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently()

        const decodedToken = jwtDecode(accessToken)
        console.log("decoded: ", decodedToken)
        setPermissions(decodedToken?.permissions)

      } catch (error) {
        console.log(error)
      }
    }

    getToken()
  }, [getAccessTokenSilently])


  return (
    <nav className="text-color-black fixed left-0 border-r border-color-border-light-grey w-56 bottom-0 top-20">
      <header className="p-2">
        <h2 className="font-bold">Settings</h2>
      </header>
      <ul>
        {permissions?.includes('create:user')
          &&
          <li className="border border-color-border-light-grey rounded-lg">
            <Link
              to='/add-user'
              className="block p-2"
            >
              Add User
            </Link>
          </li>
        }
        <li className="border border-color-border-very-light-grey font-semibold rounded-lg hover:cursor-pointer hover:bg-color-border-light-grey hover:bg-opacity-10">
          <Link
            to='/group'
            className="block p-2"
          >
            Group
          </Link>
        </li>
      </ul>
    </nav>
  )
}