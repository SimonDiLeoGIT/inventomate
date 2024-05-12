import React, { useEffect, useState } from "react"
import { getRoles, inviteUser, searchUser } from "../utils/Database.service"
import { useAuth0 } from "@auth0/auth0-react"
import add_icon from '../assets/icons/plus-circle-.svg'
import close_icon from '../assets/icons/close.svg'
import { WaitingResponse } from "./WaitingResponse"

interface props {
  idBranch: string
}

export const InviteUser: React.FC<props> = ({ idBranch }) => {


  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [results, setResults] = useState<User[] | null>(null)
  const [roles, setRoles] = useState<Rol[] | null>(null)
  const [rolesSelected, setRolesSelected] = useState<number[]>([])
  const [userSelected, setUserSelected] = useState<User | null>(null)
  const [username, setusername] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)


  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      const response = await getRoles(accessToken)
      setRoles(response)
    }

    isAuthenticated && getToken()

  }, [isAuthenticated])


  function handleMenuOpen() {
    !isOpen ?
      document.body.classList.add('none-scroll')
      :
      document.body.classList.remove('none-scroll')
    setIsOpen(!isOpen)
  }

  const searchUsers = async (email: string) => {
    setUserSelected(null)
    setusername(email)
    if (email === '') {
      setResults([])
    } else {
      const accessToken = await getAccessTokenSilently()
      const response = await searchUser(accessToken, email)
      setResults(response)
    }
  }

  const handleRoleSelect = (e: any) => {
    const { value, checked } = e.target;
    if (checked) {
      setRolesSelected([...rolesSelected, value])
    } else {
      setRolesSelected(rolesSelected.filter(opcion => opcion !== value));
    }
    console.log(checked)
    console.log(value)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    if (rolesSelected.length === 0) {
      alert("You must select at least one role for the user.");
    } else {
      const accessToken = await getAccessTokenSilently()
      if (userSelected?.idUsuario !== undefined)
        await inviteUser(accessToken, idBranch, userSelected?.idUsuario, rolesSelected)
      setIsOpen(false)
      setLoading(false)
    }
  }

  const handleUserSelect = (user: User) => {
    searchUsers(user.nickname)
    setUserSelected(user)
  }

  return (
    <>
      <button
        className="m-auto -bg--color-semidark-violet -text--color-white font-semibold p-2 rounded-lg flex items-center w-full max-w-32 max-h-10 mr-0"
        onClick={() => handleMenuOpen()}
      >
        <img src={add_icon} className="w-5 mr-2" />
        Invite user
      </button>

      <aside className={`fixed w-screen h-screen overflow-hidden top-0 left-0 ${!isOpen && 'hidden'} opacity-animation grid place-content-center`}>
        <section className='-bg--color-white p-4 relative w-80 md:w-96'>
          <header>
            <h1 className="text-lg font-semibold">Invite User</h1>
            <button
              className="absolute right-4 top-4"
              onClick={() => setIsOpen(false)}
            >
              <img src={close_icon} className="w-5" />
            </button>
          </header>
          <form className="relative" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm">User email</label>
              <input
                type="name"
                className="-bg--color-border-very-lightest-grey p-2 rounded-lg w-full"
                onChange={(e) => searchUsers(e.target.value)}
                value={username}
                required
                disabled={loading}
              />
              {(results !== null && results?.length > 0) && userSelected === null &&
                <div className="absolute overflow-auto w-full -bg--color-white max-h-52 mt-2 border -border--color-border-very-light-grey rounded-lg">
                  {
                    results?.map((user) => {
                      return (
                        <button
                          type="button"
                          className="p-2 w-full flex items-center hover:cursor-pointer hover:-bg--color-border-very-lightest-grey"
                          onClick={() => handleUserSelect(user)}
                        >
                          <img src={user.picture} className="w-6 rounded-full mr-4" />
                          {user.nickname}
                        </button>
                      )
                    })
                  }
                </div>
              }
            </div>
            <div className="mt-2">
              <label className="text-sm">Roles</label>
              <ul className="grid gap-2">
                {
                  roles?.map((role) => {
                    return (
                      <li className="p-2 flex items-center -bg--color-border-very-lightest-grey rounded-lg w-full">
                        <p>{role.nombreRol}</p>
                        <input
                          type="checkbox"
                          value={role.idRol}
                          className="m-auto mr-0 hover:cursor-pointer"
                          onChange={handleRoleSelect}
                          disabled={loading}
                        />
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className="h-14">
              {
                !loading
                  ?
                  <button
                    type="submit"
                    className="-bg--color-semidark-violet font-bold -text--color-white w-full mt-4 p-2 rounded-lg hover:opacity-80"
                  >
                    Confirm
                  </button>
                  :
                  <WaitingResponse />
              }
            </div>
          </form>
        </section>
      </aside>
    </>
  )
}