import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerCompany } from "../utils/Database.service"
import { useAuth0 } from "@auth0/auth0-react"
import { useUser } from "../hook/useUser"

export const RegisterCompany = () => {
  const navigate = useNavigate()

  const { getAccessTokenSilently } = useAuth0()
  const { setUser, currentUser } = useUser()

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [logo, setLogo] = useState<string>('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    await register()

    window.location.href = '/company'
  }

  const register = async () => {
    const body = {
      nombreEmpresa: name,
      descripcion: description,
      logo: logo
    };

    try {
      const accessToken = await getAccessTokenSilently();
      await registerCompany(accessToken, body);
      setUser(accessToken);
      console.log(currentUser);
      window.location.href = '/company'; // Redirigir después de completar las operaciones
    } catch (error) {
      console.error('Error al registrar la empresa:', error);
      // Manejar el error, si es necesario
    }
  };

  return (
    <main className="w-screen p-2 md:w-9/12 m-auto lg:w-7/12 xl:w-6/12">
      <header className="p-2">
        <h1 className="font-bold -text--color-semidark-violet text-2xl">
          Register your Company
        </h1>
      </header>
      <form onSubmit={handleSubmit} className="p-4 -bg--color-form-background-semi-white shadow-lg -shadow--color-black-shadow -text--color-black">
        <h2 className="font-semibold text-lg">
          About your Company
        </h2>
        <div className="grid gap-2 my-4">
          <label className="font-semibold -text--color-mate-dark-violet">Company Name</label>
          <input
            type="text"
            required
            className="border -border--color-border-light-grey rounded-lg p-2"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="mt-2 font-semibold -text--color-mate-dark-violet">Description</label>
          <input
            type="text"
            required
            className="border -border--color-border-light-grey rounded-lg p-2"
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="mt-2 font-semibold -text--color-mate-dark-violet">Location</label>
          <input
            type="text"
            required
            className="border -border--color-border-light-grey rounded-lg p-2"
          />
          <label className="mt-2 font-semibold -text--color-mate-dark-violet">Company Logo</label>
          <div className="w-40 h-40 border -border--color-border-light-grey rounded-xl overflow-hidden">
            <img src={logo} className="h-full w-full object-cover" />
          </div>
          <input
            type="text"
            className="border -border--color-border-light-grey rounded-lg p-2"
            onChange={(e) => setLogo(e.target.value)}
          />
          <div className="flex items-center justify-center mt-2">
            <input
              type="checkbox"
              value='I accept terms & conditions'
              className="mx-2 hover:cursor-pointer"
              required
            />
            <p className="">I accept <Link to='/terms&conditions' className="-text--color-semidark-violet">terms & conditions</Link></p>
          </div>
        </div>
        <div className="text-center space-x-4 mt-4">
          <button className="font-bold text-xl -bg--color-ful-red -text--color-white p-4 rounded-xl w-36 hover:opacity-60">Cancel</button>
          <button type="submit" className="font-bold text-xl -bg--color-semidark-violet -text--color-white p-4 rounded-xl w-36 hover:opacity-60">Register</button>
        </div>
      </form>
    </main>
  )
}