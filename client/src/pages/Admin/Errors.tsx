import { useEffect, useState } from "react";
import { AdminReportsNavbar } from "../../components/Admin/AdminReportsNavbar";
import { useUser } from "../../hook/useUser";
import { useAuth0 } from "@auth0/auth0-react";
import { getErrors } from "../../utils/Services/Admin/errors.service";
import { ErrorsReport } from "../../components/Admin/Errors/ErrorReport";

export const Errors = () => {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser } = useUser()

  const [errors, setErrors] = useState<Errors>()
  const [myAccessToken, setAccesToken] = useState<string>('')

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)
      setAccesToken(accessToken)
      getErrorssInfo(accessToken, 0, 10, 'id', 'asc', null, null)
    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  const getErrorssInfo = async (accessToken: string, currentPage: number, size: number, sort: keyof ErrorContent, order: 'asc' | 'desc', from: string | null, to: string | null) => {
    const response = await getErrors(accessToken, currentPage, size, sort, order, from, to)
    setErrors(response)
  }

  return (
    <main className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
      <AdminReportsNavbar />
      <div className="my-4 grid gap-4">
        {errors && <ErrorsReport data={errors} accessToken={myAccessToken} getErrorssInfo={getErrorssInfo} />}
      </div>
    </main>
  )
}