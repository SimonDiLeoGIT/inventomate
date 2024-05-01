import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerBranch, registerCompany } from "../utils/Database.service"
import { useAuth0 } from "@auth0/auth0-react"
import { useUser } from "../hook/useUser"

export const RegisterBranch = () => {
  const navigate = useNavigate()

  const { getAccessTokenSilently } = useAuth0()
  const { setUser, currentUser } = useUser()

  const [id, setID] = useState<number>(0)
  const [name, setName] = useState<string>('')
  const [location, setLocation] = useState<string>('')

  const register = () => {
    const body = {
      nombre: name,
      ubicacion: location,
      idSucCliente: id
    }
    const rc = async () => {
      const accessToken = await getAccessTokenSilently()
      await registerBranch(accessToken, body)
      setUser(accessToken)
      console.log(currentUser)
    }
    rc()
    navigate('/company')
  }

  return (
    <main className="w-screen p-2 md:w-9/12 m-auto lg:w-7/12 xl:w-6/12">
      <header className="p-2">
        <h1 className="font-bold -text--color-semidark-violet text-2xl">
          Register Branch
        </h1>
      </header>
      <form onSubmit={() => register()} className="p-4 -bg--color-form-background-semi-white shadow-lg -shadow--color-black-shadow -text--color-black">
        <h2 className="font-semibold text-lg">
          About your Branch
        </h2>
        <div className="grid gap-2 my-4">
          <label className="font-semibold -text--color-mate-dark-violet">ID</label>
          <input
            type="number"
            required
            className="border -border--color-border-light-grey rounded-lg p-2"
            onChange={(e) => setID(parseInt(e.target.value))}
          />
          <label className="mt-2 font-semibold -text--color-mate-dark-violet">Name</label>
          <input
            type="text"
            required
            className="border -border--color-border-light-grey rounded-lg p-2"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="mt-2 font-semibold -text--color-mate-dark-violet">Location</label>
          <input
            type="text"
            required
            className="border -border--color-border-light-grey rounded-lg p-2"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="text-center space-x-4 mt-4">
          <button className="font-bold text-xl -bg--color-ful-red -text--color-white p-4 rounded-xl w-36 hover:opacity-60">Cancel</button>
          <button type="submit" className="font-bold text-xl -bg--color-semidark-violet -text--color-white p-4 rounded-xl w-36 hover:opacity-60">Register</button>
        </div>
      </form>
    </main>
  )
}