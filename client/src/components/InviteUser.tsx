import { useEffect, useState } from "react"
import add_icon from '../assets/icons/plus-circle-.svg'
import { searchUser } from "../utils/Database.service"
import { useUser } from "../hook/useUser"
import { useAuth0 } from "@auth0/auth0-react"

export const InviteUser = () => {

  const { getAccessTokenSilently } = useAuth0();

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [results, setResults] = useState<User[] | null>(null)


  function handleMenuOpen() {
    !isOpen ?
      document.body.classList.add('none-scroll')
      :
      document.body.classList.remove('none-scroll')
    setIsOpen(!isOpen)
  }

  const searchUsers = async (email: string) => {
    if (email === '') {
      setResults([])
    } else {
      const accessToken = await getAccessTokenSilently()
      const response = await searchUser(accessToken, email)
      setResults(response)
    }
  }

  return (
    <>
      <button
        className="m-auto ml-0 -bg--color-semidark-violet -text--color-white font-semibold p-2 rounded-lg flex items-center max-w-32 max-h-10"
        onClick={() => handleMenuOpen()}
      >
        <img src={add_icon} className="w-5 mr-2" />Invite user
      </button>

      <aside className={`fixed w-screen h-screen overflow-hidden top-0 left-0 ${!isOpen && 'hidden'} opacity-animation grid place-content-center`}>
        <section className='-bg--color-white p-4'>
          <h1 className="text-lg font-semibold">Invite User</h1>
          <form className="relative">
            <label className="text-sm">User email</label>
            <input
              type="email"
              className="-bg--color-border-very-lightest-grey p-2 rounded-lg w-full"
              onChange={(e) => searchUsers(e.target.value)}
            />
            <ul className="absolute max-h-24 overflow-auto w-full -bg--color-white">
              {
                results?.map((user) => {
                  return (
                    <li>
                      {user.nickname}
                    </li>
                  )
                })
              }
            </ul>
          </form>
        </section>
      </aside>
    </>
  )
}