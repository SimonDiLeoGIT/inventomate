import { useEffect, useState } from "react"
import { connectDataBase, deleteDatabaseConnection, getDatabaseConnection } from "../utils/Database.service"
import { useAuth0 } from "@auth0/auth0-react"
import { useUser } from "../hook/useUser"
import delete_icon from '../assets/icons/delete.svg'

export const CompanySettings = () => {

  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const { setUser, currentUser } = useUser()

  const [username, setUsername] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [sgdb, setSGDB] = useState<string>('')
  const [pass, setPass] = useState<string>('')
  const [editing, setEditing] = useState<boolean>(false)
  const [databaseConnection, setDatabaseConnection] = useState<DatabaseConnection | null>(null)

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)
      const dc = await getDatabaseConnection(accessToken)
      setDatabaseConnection(dc)

      if (dc !== null) {
        setUrl(dc.url)
        setSGDB(dc.gestorBd)
        setUsername(dc.username)
        setPass(dc.password)
      }
    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  const editConnection = () => {
    const body = {
      gestorBd: sgdb,
      url: url,
      username: username,
      password: pass
    }
    const cdb = async () => {
      const accessToken = await getAccessTokenSilently()
      await connectDataBase(accessToken, body)
      setUser(accessToken)
      console.log(currentUser)
    }
    cdb()
  }

  const deleteConnection = () => {
    const deleteDb = async () => {
      const accessToken = await getAccessTokenSilently()
      await deleteDatabaseConnection(accessToken)
      setUser(accessToken)
      console.log(currentUser)
    }
    deleteDb()
  }

  return (
    <main className="w-full p-2 md:w-9/12 m-auto lg:w-7/12 xl:w-6/12">
      <header className="p-2">
        <h1 className="font-bold -text--color-semidark-violet text-2xl">
          Company Settings
        </h1>
      </header>
      <form className="p-4 -bg--color-form-background-semi-white shadow-lg -shadow--color-black-shadow -text--color-black">
        <h2 className="font-semibold text-lg">
          Database Connection
        </h2>
        <div className="grid gap-2 my-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="mt-2 font-semibold -text--color-mate-dark-violet">Username</label>
            <input
              type="text"
              required
              disabled={!editing}
              className="border -border--color-border-light-grey rounded-lg p-2"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="grid gap-2">
            <label className="mt-2 font-semibold -text--color-mate-dark-violet">SGBD</label>
            <input
              type="text"
              required
              disabled={!editing}
              className="border -border--color-border-light-grey rounded-lg p-2"
              onChange={(e) => setSGDB(e.target.value)}
              value={sgdb}
            />
          </div>
          <div className="grid gap-2">
            <label className="mt-2 font-semibold -text--color-mate-dark-violet">Password</label>
            <input
              type="password"
              required
              disabled={!editing}
              className="border -border--color-border-light-grey rounded-lg p-2"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
          </div>
          <div className="grid gap-2">
            <label className="mt-2 font-semibold -text--color-mate-dark-violet">URL</label>
            <input
              type="text"
              required
              disabled={!editing}
              className="border -border--color-border-light-grey rounded-lg p-2"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
            />
          </div>
        </div>
        {!editing ?
          <div className="w-full text-center">
            <button type="button" onClick={() => setEditing(true)} className=" font-bold text-xl -bg--color-semidark-violet -text--color-white p-4 rounded-xl w-36 hover:opacity-60">Edit</button>
          </div>
          :
          <div className="text-center space-x-4 mt-4">
            <button type="button" onClick={() => setEditing(false)} className="font-bold text-xl -bg--color-ful-red -text--color-white p-4 rounded-xl w-36 hover:opacity-60">Cancel</button>
            <button type="submit" onClick={() => editConnection()} className="font-bold text-xl -bg--color-semidark-violet -text--color-white p-4 rounded-xl w-36 hover:opacity-60">Register</button>
          </div>
        }
      </form>
      <section className="my-8 -text--color-black">
        <h2 className="font-semibold text-lg my-4">
          Danger Zone
        </h2>
        <ul className="border-4 -border--color-ful-red rounded-xl">
          <li className="p-2 flex items-center">
            <p className="font-medium">Delete Database Connection</p>
            <button
              onClick={() => deleteConnection()}
              className="-bg--color-ful-red -text--color-white p-2 rounded-xl m-auto mr-0 hover:opacity-80"
            >
              <img src={delete_icon} className="w-6" />
            </button>
          </li>
          <li className="p-2 flex items-center">
            <p className="font-medium">Delete Company</p>
            <button className="-bg--color-ful-red -text--color-white p-2 rounded-xl m-auto mr-0 hover:opacity-80">
              <img src={delete_icon} className="w-6" />
            </button>
          </li>
          <li className="p-2 flex items-center">
            <p className="font-medium">Delete Delete Branch</p>
            <button className="-bg--color-ful-red -text--color-white p-2 rounded-xl m-auto mr-0 hover:opacity-80">
              <img src={delete_icon} className="w-6" />
            </button>
          </li>
        </ul>
      </section>
    </main>
  )
}