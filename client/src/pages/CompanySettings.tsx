import { useEffect, useState } from "react"
import { deleteCompany } from "../utils/Services/company.database.service"
import { useAuth0 } from "@auth0/auth0-react"
import { useUser } from "../hook/useUser"
import delete_icon from '../assets/icons/delete.svg'
import { DatabaseConnectionForm } from "../components/Company/DatabaseConnectionForm"
import { deleteDatabaseConnection, getDatabaseConnection } from "../utils/Services/database.database.service"
import { DoneMessage } from "../components/Messages/DoneMessage"
import done from '../assets/icons/done.svg'

export const CompanySettings = () => {

  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const { setUser } = useUser()

  const [databaseConnection, setDatabaseConnection] = useState<DatabaseConnection | null>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)
      const dc = await getDatabaseConnection(accessToken)
      setDatabaseConnection(dc)
    }

    isAuthenticated && getToken()

  }, [isAuthenticated])


  const deleteConnection = () => {
    const deleteDb = async () => {
      const accessToken = await getAccessTokenSilently()
      await deleteDatabaseConnection(accessToken)
      setUser(accessToken)
      window.location.href = '/company/company-settings'
      showMessage()
    }
    deleteDb()
  }

  const handleDeleteCompany = async () => {
    const accessToken = await getAccessTokenSilently()
    const response = await deleteCompany(accessToken)
    if (response.success) {
      window.location.href = '/'
    }
  }

  const showMessage = () => {
    setShow(true)
    setVisible(true)
    setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        setShow(false)
      }, 2000)
    }, 2000)
  }

  return (
    <main className="w-full p-2 md:w-9/12 m-auto lg:w-7/12 xl:w-6/12">
      <header className="p-2">
        <h1 className="font-bold -text--color-semidark-violet text-2xl">
          Company Settings
        </h1>
      </header>
      <DatabaseConnectionForm />
      <section className="my-8 -text--color-black">
        <h2 className="font-semibold text-lg my-4">
          Danger Zone
        </h2>
        <ul className="border-4 -border--color-ful-red rounded-xl">
          {
            databaseConnection !== null
            &&
            <li className="p-2 flex items-center">
              <p className="font-medium">Delete Database Connection</p>
              <button
                onClick={() => deleteConnection()}
                className="-bg--color-ful-red -text--color-white p-2 rounded-xl m-auto mr-0 hover:opacity-80"
              >
                <img src={delete_icon} className="w-6" />
              </button>
            </li>
          }
          <li className="p-2 flex items-center">
            <p className="font-medium">Delete Company</p>
            <button
              className="-bg--color-ful-red -text--color-white p-2 rounded-xl m-auto mr-0 hover:opacity-80"
              onClick={() => handleDeleteCompany()}
            >
              <img src={delete_icon} className="w-6" />
            </button>
          </li>
          <li className="p-2 flex items-center">
            <p className="font-medium">Delete Branch</p>
            <button className="-bg--color-ful-red -text--color-white p-2 rounded-xl m-auto mr-0 hover:opacity-80">
              <img src={delete_icon} className="w-6" />
            </button>
          </li>
        </ul>
      </section>
      {
        show
        &&
        <DoneMessage message="¡Database successfully deleted!" visible={visible} image={done} />
      }
    </main>
  )
}