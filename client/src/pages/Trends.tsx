import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom"
import { useUser } from "../hook/useUser";
import { useEffect, useState } from "react";
import { getTrends } from "../utils/Database.service";

export const Trends = () => {

  const { idBranch } = useParams()
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const { currentUser, setUser } = useUser()

  const [trends, setTrends] = useState<Trends | null>(null)

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)
      if (idBranch !== undefined) {
        const newTrends = await getTrends(accessToken, idBranch)
        setTrends(newTrends)
      }
    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  return (
    <>

    </>
  )
}