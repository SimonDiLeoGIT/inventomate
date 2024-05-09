import React, { useEffect, useState } from "react"
import { editMemberRoles, editUser, getMembertRoles, getRoles } from "../utils/Database.service"
import { useAuth0 } from "@auth0/auth0-react"
import close_icon from '../assets/icons/close.svg'
import { useUser } from '../hook/useUser'
import edit_icon from '../assets/icons/edit-violet.svg'

interface props {
  user: User
}

export const EditUser: React.FC<props> = ({ user }) => {


  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [userImage, setUserImage] = useState<string>('')
  const [username, setUsername] = useState<string>('')


  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()

    }

    isAuthenticated && getToken()

    setUserImage(user.picture)
    setUsername(user.nickname)

  }, [isAuthenticated])


  function handleMenuOpen() {
    !isOpen ?
      document.body.classList.add('none-scroll')
      :
      document.body.classList.remove('none-scroll')
    setIsOpen(!isOpen)
  }


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const accessToken = await getAccessTokenSilently()
    await editUser(accessToken, username, userImage)
    setIsOpen(false)
  }
  return (
    <>
      <button
        className="m-auto mr-0"
        onClick={handleMenuOpen}
      >
        <img src={edit_icon} className={`w-8 opacity-70 hover:opacity-50`} />
      </button>

      <aside className={`fixed w-screen h-screen overflow-hidden top-0 left-0 ${!isOpen && 'hidden'} opacity-animation grid place-content-center`}>
        <section className='-bg--color-white p-4 relative w-screen max-w-xl rounded-xl'>
          <header>
            <h1 className="text-lg font-semibold">Edit User</h1>
            <button
              className="absolute right-4 top-4"
              onClick={() => setIsOpen(false)}
            >
              <img src={close_icon} className="w-5" />
            </button>
          </header>
          <form className="relative" onSubmit={handleSubmit}>
            <div className=''>
              <label className="font-semibold -text--color-violet-user-email text-sm">Picture</label>
              <img src={userImage} className='m-auto w-48' />
              <input
                type="text"
                className="border -border--color-border-light-grey rounded-lg p-2 mt-2 w-full"
                onChange={(e) => setUserImage(e.target.value)}
                value={userImage}
              />
            </div>
            <div className="grid my-2">
              <label className="font-semibold -text--color-violet-user-email text-sm">Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border -border--color-border-light-grey rounded-lg p-2 disabled:-text--color-border-light-grey"
              />
            </div>
            <button
              type="submit"
              className="-bg--color-semidark-violet font-bold -text--color-white w-full mt-4 p-2 rounded-lg hover:opacity-80"
            >
              Confirm
            </button>
          </form>
        </section>
      </aside>
    </>
  )
}