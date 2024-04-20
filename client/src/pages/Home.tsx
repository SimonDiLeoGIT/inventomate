import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'
import { Login } from "./Login";

export const Home = () => {

  const { getAccessTokenSilently } = useAuth0()

  const [permissions, setPermissions] = useState<string[]>()

  useEffect(() => {

    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently()

        console.log("accestoken: ", accessToken)
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
    <main className="text-center m-auto w-96 mt-20">
      <h1 className="font-bold text-lg">User Permisions</h1>
      <ul className="">
        {permissions?.map(p => {
          return (
            <li className="p-2 border border-stone-700 mb-2 rounded-xl">
              {p}
            </li>
          )
        })}
      </ul>
    </main>
  );
};
