import { useEffect, useState } from "react"
import { useUser } from "../hook/useUser";
import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const { currentUser, setUser } = useUser()

  const [username, setUsername] = useState<string | null>(null)
  const [useremail, setUseremail] = useState<string | null>(null)

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)

      if (currentUser !== null) {
        setUsername(currentUser?.usuario.nickname)
        setUseremail(currentUser?.usuario.email)
      }
    }

    isAuthenticated && getToken()


  }, [isAuthenticated])

  return (
    <main className="w-11/12 m-auto -text--color-black">
      <header className="p-2">
        <img src={currentUser?.usuario.picture} className="rounded-full w-20 shadow-md -shadow--color-black-shadow" />
      </header>
      <section>
        <h1 className="font-semibold text-lg">About you</h1>
        <form className="p-2">
          <div className="grid mb-2">
            <label className="font-semibold -text--color-violet-user-email text-sm">Name</label>
            <input
              type="text"
              value={username === null ? currentUser?.usuario.nickname : username}
              onChange={(e) => setUsername(e.target.value)}
              className="hover:-bg--color-border-very-lightest-grey p-2 -text--color-border-light-grey text-lg"
            />
          </div>
          <div className="grid">
            <label className="font-semibold -text--color-violet-user-email text-sm">E-mail address</label>
            <input
              type="text"
              value={useremail === null ? currentUser?.usuario.email : useremail}
              onChange={(e) => setUseremail(e.target.value)}
              className="hover:-bg--color-border-very-lightest-grey p-2 -text--color-border-light-grey text-lg"
            />
          </div>
        </form>
      </section>
      <section>
        <header>
          <h1 className="font-semibold text-lg">
            Company
          </h1>
        </header>
        <section className="py-2">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 overflow-hidden mr-4">
                <img src={currentUser?.empresa?.logo} className='h-full object-cover' />
              </div>
              <h1 className="text-md font-bold">{currentUser?.empresa?.nombreEmpresa}</h1>
            </div>
            <div className="m-auto mr-2">
              <h2 className="font-bold -text--color-semidark-violet text-sm">Owner</h2>
              <div className="flex items-center space-x-2">
                <img
                  src={currentUser?.usuario.picture}
                  alt={currentUser?.empresa?.owner.nickname}
                  className="w-8 h-8 rounded-full"
                />
                <section className="text-sm">
                  <p className="-text--color-violet-user-email font-bold">{currentUser?.empresa?.owner.nickname}</p>
                  <p className="-text--color-violet-user-email">{currentUser?.empresa?.owner.email}</p>
                </section>
              </div>
            </div>
          </div>
          <section className="mt-2">
            <h2 className="font-semibold -text--color-violet-user-email">Roles</h2>
            <ul className="shadow -shadow--color-border-light-grey">
              {
                currentUser?.roles.map(rol => {
                  return (
                    <li className="">
                      <details className="">
                        <summary className=" p-2 list-none -bg--color-border-very-lightest-grey border-b -text--color-violet-user-email font-semibold">{rol.nombreRol}</summary>
                        <p className="p-2 text-sm">{rol.descripcion}</p>
                      </details>
                    </li>
                  )
                })
              }
            </ul>
          </section>
        </section>
      </section>
    </main>
  )
}