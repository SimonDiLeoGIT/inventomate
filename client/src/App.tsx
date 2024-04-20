import { useAuth0 } from "@auth0/auth0-react";
import { Router } from "./utils/Router"
import { Login } from "./pages/Login";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { DatabaseService } from "./utils/DatabaseService";
import axios from "axios";

function App() {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {


    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently()

        console.log("accestoken: ", accessToken)
        const decodedToken = jwtDecode(accessToken)
        console.log("decoded: ", decodedToken)

        //pegarle a endpoint sign-up
        const respose = await axios({
          url: 'http://localhost:8080/api/users/sign-up',
          method: 'POST',
          headers: {
            "content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${accessToken}`,
          }
        })

        console.log("response:", respose)

      } catch (error) {
        console.log(error)
      }
    }

    if (isAuthenticated) {
      getToken()
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return <Login />
  }


  return (
    <Router />
  )
}

export default App
