import { useEffect, useState } from "react"
import { useUser } from "../hook/useUser";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteUser, editUser, editUserPass } from "../utils/Database.service";
import delete_icon from '../assets/icons/delete.svg'
import logout_icon from '../assets/icons/logout-white.svg'
import password_icon from '../assets/icons/password.svg'
import edit_grey_icon from '../assets/icons/edit-grey.svg'
import { EditUser } from "../components/EditUser";

export const Profile = () => {

  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();

  const { currentUser, setUser } = useUser()

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)
    }

    isAuthenticated && getToken()


  }, [isAuthenticated])

  const handleChangePass = async () => {
    const accessToken = await getAccessTokenSilently()
    const response = await editUserPass(accessToken)
    console.log(response)
    if (response)
      window.location.href = response.ticket
  }

  const handleDelete = async () => {
    const accessToken = await getAccessTokenSilently()
    const response = await deleteUser(accessToken)
    console.log(response)
    logout({
      openUrl() {
        window.location.href = window.location.origin
      }
    })
  }

  return (
    <main className="w-11/12 m-auto -text--color-black max-w-4xl my-4">
      <header className="p-2 flex items-center">
        <img src={currentUser?.usuario.picture} className="rounded-full w-16 shadow-md -shadow--color-black-shadow mr-4" />
        <h1 className="font-semibold text-2xl">{currentUser?.usuario.nickname}</h1>
        <EditUser user={currentUser?.usuario} />
      </header>
      <section className="p-2">
        <h1 className="font-semibold text-lg">About you</h1>
        <section>
          <div className="grid mb-2">
            <h2 className="font-semibold -text--color-violet-user-email text-sm">Name</h2>
            <p className="-text--color-border-light-grey">
              {currentUser?.usuario.nickname}
            </p>
          </div>
          <div className="grid mb-2">
            <h2 className="font-semibold -text--color-violet-user-email text-sm">E-mail address</h2>
            <p className="-text--color-border-light-grey">
              {currentUser?.usuario.email}
            </p>
          </div>
        </section>
      </section>
      {
        currentUser?.empresa !== null
        &&
        <section className="mt-8">
          <header>
            <h1 className="font-semibold text-lg">
              Company
            </h1>
          </header>
          <section className="py-2 md:grid grid-cols-2">
            <div className="flex items-center">
              <div className="w-12 h-12 overflow-hidden mr-4">
                <img src={currentUser?.empresa?.logo} className='h-full object-cover' />
              </div>
              <h1 className="text-md font-bold">{currentUser?.empresa?.nombreEmpresa}</h1>
            </div>
            <section className="mt-2 text-sm">
              <h2 className="font-bold -text--color-semidark-violet">Owner</h2>
              <p className="-text--color-violet-user-email font-bold">{currentUser?.empresa?.owner.nickname}</p>
              <p className="-text--color-violet-user-email">{currentUser?.empresa?.owner.email}</p>
            </section>
            <section className="text-sm row-start-1 col-start-2 row-span-2">
              <h2 className="font-bold -text--color-semidark-violet mb-2">Roles</h2>
              <ul className="shadow -shadow--color-border-light-grey">
                {
                  currentUser?.roles.map(rol => {
                    return (
                      <li className="">
                        <details className="">
                          <summary className=" p-2 list-none -bg--color-border-very-lightest-grey border-b -text--color-violet-user-email font-semibold hover:opacity-80 hover:cursor-pointer">{rol.nombreRol}</summary>
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
      }
      <section>
        <section className="my-8 -text--color-black">
          <h2 className="font-semibold text-lg my-4">
            Danger Zone
          </h2>
          <ul className="border-4 -border--color-ful-red rounded-xl">
            <li className="p-2 flex items-center">
              <p className="font-medium">Change Password</p>
              <button
                onClick={handleChangePass}
                className="-bg--color-ful-red -text--color-white p-2 rounded-xl m-auto mr-0 hover:opacity-80"
                disabled
              >
                <img src={password_icon} className="w-6" />
              </button>
            </li>
            {
              currentUser?.empresa !== null
              &&
              <li className="p-2 flex items-center">
                <p className="font-medium">Leaving the Company</p>
                <button className="-bg--color-ful-red -text--color-white p-2 rounded-xl m-auto mr-0 hover:opacity-80">
                  <img src={logout_icon} className="w-6" />
                </button>
              </li>
            }
            <li className="p-2 flex items-center">
              <p className="font-medium">Delete Account</p>
              <button
                className="-bg--color-ful-red -text--color-white p-2 rounded-xl m-auto mr-0 hover:opacity-80"
                onClick={handleDelete}
              >
                <img src={delete_icon} className="w-6" />
              </button>
            </li>
          </ul>
        </section>
      </section>
    </main>
  )
}